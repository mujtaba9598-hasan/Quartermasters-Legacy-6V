import { Redis } from '@upstash/redis'

// --- Upstash Redis Client ---
// Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars.
// Free tier: 10K commands/day — sufficient for rate limiting + RAG cache.

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// --- Distributed Rate Limiting ---
// Sliding window counter using Redis INCR + EXPIRE.
// Survives cold starts, shared across all serverless instances.

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number }> {
  const redisKey = `rl:${key}`
  const windowSeconds = Math.ceil(windowMs / 1000)

  const count = await redis.incr(redisKey)

  // Set expiry only on the first request in the window
  if (count === 1) {
    await redis.expire(redisKey, windowSeconds)
  }

  const remaining = Math.max(0, limit - count)
  return {
    allowed: count <= limit,
    remaining,
  }
}

// --- Generic Cache Get ---
// Returns parsed value or null if key doesn't exist / has expired.

export async function cacheGet<T>(key: string): Promise<T | null> {
  const value = await redis.get<T>(`cache:${key}`)
  return value ?? null
}

// --- Generic Cache Set ---
// Stores a value with a TTL in seconds. Overwrites existing keys.

export async function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds: number
): Promise<void> {
  await redis.set(`cache:${key}`, value, { ex: ttlSeconds })
}
