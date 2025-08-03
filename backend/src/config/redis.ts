import { Redis } from "@upstash/redis";

// Create Upstash Redis client using REST API
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const DEFAULT_CACHE_TIME = 604800; // 1 hour in seconds

// Test Redis connection
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

// Cache utility functions
export const cacheService = {
  // Get cached value
  get: async (key: string) => {
    try {
      return await redis.get(key);
    } catch (error) {
      console.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  },

  // Set cached value with TTL
  set: async (key: string, value: any, expireTime = DEFAULT_CACHE_TIME) => {
    // Default 7 days
    try {
      return await redis.setex(key, expireTime, JSON.stringify(value));
    } catch (error) {
      console.error(`Redis SET error for key ${key}:`, error);
      return null;
    }
  },

  // Delete cached value
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
