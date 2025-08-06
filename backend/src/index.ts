import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// security packages
import cors from "cors";
import router from "./routes/index.js";
import authRouter from "./routes/auth.js";
// import helmet from "helmet";
// import xss from "xss-clean";
// import hpp from "hpp";
// import rateLimit from "express-rate-limit";

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// connect db

// authentication

// middleware
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? [process.env.FRONTEND_DEV_URL, "http://localhost:5173"]
    : [process.env.FRONTEND_PROD_URL].filter(Boolean); // removes falsy values

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
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json()); // req.body parser
app.use(express.urlencoded({ extended: true })); // converts form data to req.body

// error handling

// reverse proxy (trust proxy)

// routes
app.use("/api/v1", router);
app.use("/api/v1/auth", authRouter);

// start server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
