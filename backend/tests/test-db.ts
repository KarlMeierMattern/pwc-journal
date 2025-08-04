// Simple Database connection test
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../.env" });

// Add debug to verify variables loaded
console.log("🔍 Environment check:");
console.log("DB_HOST:", process.env.DB_HOST ? "✅ Set" : "❌ Missing");
console.log("DB_USER:", process.env.DB_USER ? "✅ Set" : "❌ Missing");
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✅ Set" : "❌ Missing");
console.log("DB_NAME:", process.env.DB_NAME ? "✅ Set" : "❌ Missing");

async function testDatabase() {
  const { testConnection, db } = await import("../src/config/database.js");
  const { users } = await import("../src/db/schema/index.js");

  console.log("🔍 Testing MySQL database connection...");

  try {
    // Test basic connection
    await testConnection();

    // Test database operations
    console.log("🧪 Testing database operations...");

    // Test creating a user
    const testUser = {
      email: "test@example.com",
      passwordHash: "test-hash-123",
    };

    console.log("📝 Creating test user...");
    const [createdUser] = await db.insert(users).values(testUser);
    console.log("✅ Created test user with ID:", createdUser.insertId);

    // Test reading the user
    console.log("📖 Reading test user...");
    const foundUsers = await db.select().from(users);
    console.log("✅ Found users:", foundUsers.length);

    // Test deleting the user
    console.log("🗑️ Cleaning up test user...");
    await db.delete(users);
    console.log("✅ Cleaned up test data");

    // Verify cleanup
    const remainingUsers = await db.select().from(users);
    console.log("✅ Remaining users after cleanup:", remainingUsers.length);

    console.log("🎉 All database tests passed!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
    process.exit(1);
  }
}

testDatabase();
