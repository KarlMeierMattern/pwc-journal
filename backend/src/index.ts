import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth-router.js";
import journalRouter from "./routes/journal-router.js";
import agentRouter from "./routes/agent-router.js";
import { testConnection } from "./config/database.js";
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  console.log("Main app env check:");
  console.log("DB_HOST:", process.env.DB_HOST ? "Set" : "Missing");
  console.log("DB_PORT:", process.env.DB_PORT ? "Set" : "Missing");
  console.log("DB_USER:", process.env.DB_USER ? "Set" : "Missing");
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Set" : "Missing");
  console.log("DB_NAME:", process.env.DB_NAME ? "Set" : "Missing");
  console.log("DB_URL:", process.env.DB_URL ? "Set" : "Missing");
  console.log(
    "OPENAI_API_KEY:",
    process.env.OPENAI_API_KEY ? "Set" : "Missing",
  );
  console.log("Testing database connection on startup...");
}
testConnection();

export const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_PROD_URL]
    : ["http://localhost:5173"];

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Allowed Origins:", allowedOrigins);

app.set("trust proxy", 1); // trust the 1st proxy in front
app.use(helmet());

// Rate limit all routes - 100 requests per 15 minutes
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

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
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limit auth routes - 10 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1/journal", journalRouter);

// Rate limit agent (e.g. AI summary) - 5 requests per 15 minutes
const agentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1/agent", agentLimiter, agentRouter);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
