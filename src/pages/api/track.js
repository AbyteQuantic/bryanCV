import { getRedis } from '@library/redis';

const HOT_LEAD_THRESHOLD_SECONDS = 120;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redis = getRedis();
  if (!redis) {
    return res.status(200).json({ ok: true, stored: false });
  }

  const { event, visitorId, section, question, duration } = req.body;

  if (!event || !visitorId) {
    return res.status(400).json({ error: 'Missing event or visitorId' });
  }

  const today = new Date().toISOString().slice(0, 10);

  try {
    const pipe = redis.pipeline();

    switch (event) {
      case 'page_view':
        pipe.incr('metrics:page_views');
        pipe.incr(`metrics:page_views:${today}`);
        if (section) {
          pipe.zincrby('metrics:sections', 1, section);
        }
        pipe.sadd(`metrics:visitors:${today}`, visitorId);
        break;

      case 'chat_question':
        if (question) {
          pipe.lpush(
            'metrics:chat_questions',
            JSON.stringify({
              q: question.slice(0, 500),
              vid: visitorId.slice(0, 8),
              at: new Date().toISOString(),
            })
          );
          pipe.ltrim('metrics:chat_questions', 0, 49);
          /* Chatting = engaged visitor → potential hot lead */
          pipe.sadd('metrics:hot_leads', visitorId);
          pipe.hset(`metrics:lead:${visitorId}`, {
            chatted: 'true',
            lastSeen: new Date().toISOString(),
          });
        }
        break;

      case 'cv_download':
        pipe.incr('metrics:cv_downloads');
        pipe.incr(`metrics:cv_downloads:${today}`);
        /* CV download = definitely a hot lead */
        pipe.sadd('metrics:hot_leads', visitorId);
        pipe.hset(`metrics:lead:${visitorId}`, {
          downloadedCV: 'true',
          lastSeen: new Date().toISOString(),
        });
        break;

      case 'session_end':
        if (typeof duration === 'number') {
          pipe.lpush('metrics:session_durations', duration);
          pipe.ltrim('metrics:session_durations', 0, 199);
          /* Long session = hot lead */
          if (duration >= HOT_LEAD_THRESHOLD_SECONDS) {
            pipe.sadd('metrics:hot_leads', visitorId);
            pipe.hset(`metrics:lead:${visitorId}`, {
              longSession: String(duration),
              lastSeen: new Date().toISOString(),
            });
          }
        }
        break;
    }

    await pipe.exec();
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(200).json({ ok: true, stored: false });
  }
}
