import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

console.log("�� Main app env check:");
console.log("DB_HOST:", process.env.DB_HOST ? "✅ Set" : "❌ Missing");
console.log("DB_PORT:", process.env.DB_PORT ? "✅ Set" : "❌ Missing");
console.log("DB_USER:", process.env.DB_USER ? "✅ Set" : "❌ Missing");
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✅ Set" : "❌ Missing");
console.log("DB_NAME:", process.env.DB_NAME ? "✅ Set" : "❌ Missing");
console.log("DB_URL:", process.env.DB_URL ? "✅ Set" : "❌ Missing");
console.log(
  "OPENAI_API_KEY:",
  process.env.OPENAI_API_KEY ? "✅ Set" : "❌ Missing"
);

// Test database connection on startup
import { testConnection } from "./config/database.js";

// Add this after your environment check:
console.log("🔍 Testing database connection on startup...");

testConnection();

// security packages
import cors from "cors";
import router from "./routes/index.js";
import authRouter from "./routes/auth-router.js";
import journalRouter from "./routes/journal-router.js";
import agentRouter from "./routes/agent-router.js";
// import helmet from "helmet";
// import xss from "xss-clean";
// import hpp from "hpp";
// import rateLimit from "express-rate-limit";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_PROD_URL]
    : ["http://localhost:5173"];

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request from origin:", origin);
      if (!origin || allowedOrigins?.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Origin rejected:", origin);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json()); // req.body parser
app.use(express.urlencoded({ extended: true })); // converts form data to req.body

// error handling

// reverse proxy (trust proxy)

// routes
app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/journal", journalRouter);
app.use("/api/v1/agent", agentRouter);

// start server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
