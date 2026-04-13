import { getRedis } from '@library/redis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Validate session cookie */
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
    return res.status(200).json({
      pageViews: 0,
      cvDownloads: 0,
      chatQuestions: [],
      sections: [],
      avgSessionDuration: 0,
      hotLeadsCount: 0,
      uniqueVisitorsToday: 0,
      noRedis: true,
    });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    const [
      pageViews,
      cvDownloads,
      chatQuestions,
      sections,
      sessionDurations,
      hotLeadsCount,
      uniqueVisitorsToday,
      todayViews,
      todayDownloads,
    ] = await Promise.all([
      redis.get('metrics:page_views'),
      redis.get('metrics:cv_downloads'),
      redis.lrange('metrics:chat_questions', 0, 19),
      redis.zrange('metrics:sections', 0, -1, { withScores: true, rev: true }),
      redis.lrange('metrics:session_durations', 0, 99),
      redis.scard('metrics:hot_leads'),
      redis.scard(`metrics:visitors:${today}`),
      redis.get(`metrics:page_views:${today}`),
      redis.get(`metrics:cv_downloads:${today}`),
    ]);

    /* Parse chat questions */
    const parsedQuestions = (chatQuestions || []).map((q) => {
      try {
        return typeof q === 'string' ? JSON.parse(q) : q;
      } catch {
        return { q, at: null };
      }
    });

    /* Parse sections sorted set */
    const parsedSections = [];
    if (sections && sections.length) {
      for (let i = 0; i < sections.length; i += 2) {
        parsedSections.push({
          name: sections[i],
          views: Number(sections[i + 1]) || 0,
        });
      }
    }

    /* Average session duration */
    const durations = (sessionDurations || []).map(Number).filter(Boolean);
    const avgSessionDuration =
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0;

    return res.status(200).json({
      pageViews: Number(pageViews) || 0,
      cvDownloads: Number(cvDownloads) || 0,
      chatQuestions: parsedQuestions,
      sections: parsedSections,
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
