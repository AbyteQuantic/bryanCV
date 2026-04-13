import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured' });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  /* Set httpOnly session cookie — 24h expiry */
  const token = Buffer.from(`${Date.now()}:${adminPassword}`).toString(
    'base64'
  );

  res.setHeader(
    'Set-Cookie',
    serialize('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    })
  );

  return res.status(200).json({ ok: true });
}
