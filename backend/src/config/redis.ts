import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const DEFAULT_CACHE_TIME = 604800; // 1 hour

export const testRedisConnection = async () => {
  try {
    const result = await redis.ping();
    console.log("✅ Upstash Redis ping successful:", result);
    return true;
  } catch (error) {
    console.error("❌ Upstash Redis ping failed:", error);
    throw error;
  }
};

export const cacheService = {
  get: async (key: string) => {
    try {
      return await redis.get(key);
    } catch (error) {
      console.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  },
  set: async (key: string, value: any, expireTime = DEFAULT_CACHE_TIME) => {
    try {
      return await redis.setex(key, expireTime, JSON.stringify(value));
    } catch (error) {
      console.error(`Redis SET error for key ${key}:`, error);
      return null;
    }
  },
  delete: async (key: string) => {
    try {
      return await redis.del(key);
    } catch (error) {
      console.error(`Redis DELETE error for key ${key}:`, error);
      return null;
    }
  },
};

export default redis;
