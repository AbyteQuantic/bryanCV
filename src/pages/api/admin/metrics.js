import { getRedis } from '@library/redis';

function parseSortedSet(raw) {
  if (!raw || !raw.length) return [];
  const result = [];
  for (let i = 0; i < raw.length; i += 2) {
    result.push({ name: raw[i], value: Number(raw[i + 1]) || 0 });
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.cookies?.admin_session;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!token || !adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString();
    if (!decoded.endsWith(`:${adminPassword}`)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const redis = getRedis();
  if (!redis) {
    return res.status(200).json({ noRedis: true });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    const [
      pageViews,
      cvDownloads,
      chatInteractions,
      chatQuestions,
      sections,
      countries,
      devices,
      sessionDurations,
      hotLeadsCount,
      uniqueVisitorsToday,
      todayViews,
      todayDownloads,
    ] = await Promise.all([
      redis.get('metrics:page_views'),
      redis.get('metrics:cv_downloads'),
      redis.get('metrics:chat_interactions'),
      redis.lrange('metrics:chat_questions', 0, 24),
      redis.zrange('metrics:sections', 0, -1, { withScores: true, rev: true }),
      redis.zrange('metrics:countries', 0, -1, { withScores: true, rev: true }),
      redis.zrange('metrics:devices', 0, -1, { withScores: true, rev: true }),
      redis.lrange('metrics:session_durations', 0, 99),
      redis.scard('metrics:hot_leads'),
      redis.scard(`metrics:visitors:${today}`),
      redis.get(`metrics:page_views:${today}`),
      redis.get(`metrics:cv_downloads:${today}`),
    ]);

    const pv = Number(pageViews) || 0;
    const dl = Number(cvDownloads) || 0;

    const parsedQuestions = (chatQuestions || []).map((q) => {
      try {
        return typeof q === 'string' ? JSON.parse(q) : q;
      } catch {
        return { q, at: null };
      }
    });

    const durations = (sessionDurations || []).map(Number).filter(Boolean);
    const avgSessionDuration =
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0;

    return res.status(200).json({
      pageViews: pv,
      cvDownloads: dl,
      chatInteractions: Number(chatInteractions) || 0,
      conversionRate: pv > 0 ? ((dl / pv) * 100).toFixed(1) : '0.0',
      chatQuestions: parsedQuestions,
      sections: parseSortedSet(sections),
      countries: parseSortedSet(countries),
      devices: parseSortedSet(devices),
      avgSessionDuration,
      hotLeadsCount: Number(hotLeadsCount) || 0,
      uniqueVisitorsToday: Number(uniqueVisitorsToday) || 0,
      todayViews: Number(todayViews) || 0,
      todayDownloads: Number(todayDownloads) || 0,
    });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch metrics' });
  }
}
