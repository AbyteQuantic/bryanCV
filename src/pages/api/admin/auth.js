import { serialize } from 'cookie';
import { safeEqual, signSession, SESSION_TTL_SECONDS } from '@library/adminSession';
import { allowRequest, clientIp } from '@library/rateLimit';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return res.status(503).json({ error: 'Admin not configured' });
  }

  /* Sin Redis no hay tope de intentos, así que el login se cierra. */
  const allowed = await allowRequest(`admin-login:${clientIp(req)}`, 5, 15 * 60, {
    failClosed: true,
  });
  if (!allowed) {
    return res.status(429).json({ error: 'Too many attempts, try again later' });
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!safeEqual(password, adminPassword)) {
    await sleep(800);
    return res.status(401).json({ error: 'Invalid password' });
  }

  res.setHeader(
    'Set-Cookie',
    serialize('admin_session', signSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    })
  );
  return res.status(200).json({ ok: true });
}
