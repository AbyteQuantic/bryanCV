import crypto from 'crypto';

/* Cookie `<emitidoEnMs>.<hmacHex>`. Rotar la clave de firma (ADMIN_SESSION_SECRET,
   o ADMIN_PASSWORD si aquella no existe) invalida todas las sesiones. */

export const SESSION_TTL_SECONDS = 60 * 60 * 24;
export const SESSION_FORMAT = /^(\d{10,16})\.([a-f0-9]{64})$/;

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function mac(value) {
  return crypto.createHmac('sha256', sessionSecret()).update(value).digest();
}

export function signSession(now = Date.now()) {
  const issuedAt = String(now);
  return `${issuedAt}.${mac(issuedAt).toString('hex')}`;
}

export function verifySession(token, now = Date.now()) {
  if (!sessionSecret() || typeof token !== 'string') return false;
  const match = SESSION_FORMAT.exec(token);
  if (!match) return false;

  const issuedAt = Number(match[1]);
  const age = now - issuedAt;
  if (age < -60_000 || age > SESSION_TTL_SECONDS * 1000) return false;

  const expected = mac(match[1]);
  const given = Buffer.from(match[2], 'hex');
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

/* Se comparan hashes porque timingSafeEqual exige longitudes iguales. */
export function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}
