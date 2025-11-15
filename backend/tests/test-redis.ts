import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log("🔍 Environment check:");
console.log(
  "URL:",
  process.env.UPSTASH_REDIS_REST_URL ? "✅ Set" : "❌ Missing"
);
console.log(
  "TOKEN:",
  process.env.UPSTASH_REDIS_REST_TOKEN ? "✅ Set" : "❌ Missing"
);

async function testRedis() {
  const { testRedisConnection, cacheService } = await import(
    "../src/config/redis.js"
  );

  console.log("🔍 Testing Upstash Redis connection...");

  try {
    await testRedisConnection();

    console.log("🧪 Testing cache operations...");

    await cacheService.set(
      "test-key",
      { message: "Hello from Upstash!", timestamp: Date.now() },
      60
    );
    console.log("✅ Set test value");

    const retrievedValue = await cacheService.get("test-key");
    console.log("✅ Retrieved test value:", retrievedValue);

    await cacheService.delete("test-key");
    console.log("✅ Deleted test value");

    const deletedValue = await cacheService.get("test-key");
    console.log("✅ Verified deletion (should be null):", deletedValue);

    console.log("🎉 All Redis tests passed!");
  } catch (error) {
    console.error("❌ Redis test failed:", error);
    process.exit(1);
  }
}

testRedis();
