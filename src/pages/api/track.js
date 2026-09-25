import { getRedis } from '@library/redis';
import { allowRequest, clientIp } from '@library/rateLimit';

const HOT_LEAD_THRESHOLD_SECONDS = 120;
const EVENTS = new Set(['page_view', 'chat_question', 'cv_download', 'session_end']);
const VISITOR_ID = /^[A-Za-z0-9_-]{8,64}$/;
const SECTION = /^[A-Za-z0-9_-]{1,48}$/;
const DAILY_TTL = 60 * 60 * 24 * 35; /* el dashboard lee los últimos 7 días */
const LEAD_TTL = 60 * 60 * 24 * 90;

function parseDevice(ua) {
  if (!ua) return 'unknown';
  return /mobile|android|iphone|ipad|ipod/i.test(ua) ? 'mobile' : 'desktop';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, visitorId, section, question, duration } = req.body || {};

  if (!EVENTS.has(event) || typeof visitorId !== 'string' || !VISITOR_ID.test(visitorId)) {
    return res.status(400).json({ error: 'Invalid event or visitorId' });
  }
  const validSection = typeof section === 'string' && SECTION.test(section) ? section : null;

  const redis = getRedis();
  if (!redis) {
    return res.status(200).json({ ok: true, stored: false });
  }

  if (!(await allowRequest(`track:${clientIp(req)}`, 120, 10 * 60))) {
    return res.status(429).json({ error: 'Too many events' });
  }

  const today = new Date().toISOString().slice(0, 10);

  /* Extract geo & device from headers */
  const country =
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    'unknown';
  const device = parseDevice(req.headers['user-agent']);

  try {
    const pipe = redis.pipeline();

    /* Always track geo & device on any event */
    if (country && country !== 'unknown') {
      pipe.zincrby('metrics:countries', 1, country);
    }
    pipe.zincrby('metrics:devices', 1, device);

    switch (event) {
      case 'page_view':
        pipe.incr('metrics:page_views');
        pipe.incr(`metrics:page_views:${today}`);
        pipe.expire(`metrics:page_views:${today}`, DAILY_TTL);
        if (validSection) {
          pipe.zincrby('metrics:sections', 1, validSection);
        }
        pipe.sadd(`metrics:visitors:${today}`, visitorId);
        pipe.expire(`metrics:visitors:${today}`, DAILY_TTL);
        break;

      case 'chat_question':
        if (typeof question === 'string' && question.trim()) {
          pipe.lpush(
            'metrics:chat_questions',
            JSON.stringify({
              q: question.slice(0, 500),
              vid: visitorId.slice(0, 8),
              country,
              device,
              at: new Date().toISOString(),
            })
          );
          pipe.ltrim('metrics:chat_questions', 0, 49);
          pipe.incr('metrics:chat_interactions');
          pipe.sadd('metrics:hot_leads', visitorId);
          pipe.hset(`metrics:lead:${visitorId}`, {
            chatted: 'true',
            country,
            device,
            lastSeen: new Date().toISOString(),
          });
          pipe.expire(`metrics:lead:${visitorId}`, LEAD_TTL);
        }
        break;

      case 'cv_download':
        pipe.incr('metrics:cv_downloads');
        pipe.incr(`metrics:cv_downloads:${today}`);
        pipe.expire(`metrics:cv_downloads:${today}`, DAILY_TTL);
        pipe.sadd('metrics:hot_leads', visitorId);
        pipe.hset(`metrics:lead:${visitorId}`, {
          downloadedCV: 'true',
          country,
          device,
          lastSeen: new Date().toISOString(),
        });
        pipe.expire(`metrics:lead:${visitorId}`, LEAD_TTL);
        break;

      case 'session_end': {
        /* Duración en segundos, acotada a 2 h para no sesgar el promedio. */
        const seconds = Number(duration);
        if (Number.isFinite(seconds) && seconds > 0) {
          const clamped = Math.min(Math.round(seconds), 7200);
          pipe.lpush('metrics:session_durations', clamped);
          pipe.ltrim('metrics:session_durations', 0, 199);
          if (clamped >= HOT_LEAD_THRESHOLD_SECONDS) {
            pipe.sadd('metrics:hot_leads', visitorId);
            pipe.hset(`metrics:lead:${visitorId}`, {
              longSession: String(clamped),
              country,
              device,
              lastSeen: new Date().toISOString(),
            });
            pipe.expire(`metrics:lead:${visitorId}`, LEAD_TTL);
          }
        }
        break;
      }
    }

    await pipe.exec();
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(200).json({ ok: true, stored: false });
  }
}
