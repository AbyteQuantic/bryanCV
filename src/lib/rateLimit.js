import { getRedis } from '@library/redis';

/* En Vercel la plataforma sobrescribe x-forwarded-for: el primer valor es el cliente. */
export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded || '')
    .split(',')[0]
    .trim();
  return first || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

/* INCR y EXPIRE en una sola operación: si fueran dos llamadas, un fallo entre
   ambas dejaría la clave sin TTL y la IP bloqueada para siempre. */
const INCR_WITH_TTL = `
local count = redis.call('INCR', KEYS[1])
if redis.call('TTL', KEYS[1]) < 0 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
end
return count`;

/* Ventana fija. Sin Redis (o si falla) permite la petición, salvo con
   failClosed, pensado para autenticación. */
export async function allowRequest(key, limit, windowSeconds, { failClosed = false } = {}) {
  const redis = getRedis();
  if (!redis) return !failClosed;
  try {
    const count = await redis.eval(INCR_WITH_TTL, [`rl:${key}`], [String(windowSeconds)]);
    return Number(count) <= limit;
  } catch {
    return !failClosed;
  }
}
