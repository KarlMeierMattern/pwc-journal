import express from "express";
import dotenv from "dotenv";
dotenv.config();

// security packages
import cors from "cors";
import router from "./routes/index.js";
// import helmet from "helmet";
// import xss from "xss-clean";
// import hpp from "hpp";
// import rateLimit from "express-rate-limit";

// Initialize Express
const app = express();
const port = 3000;

// connect db

// authentication

// middleware
app.use(cors());

// error handling

// reverse proxy (trust proxy)

// routes
app.use("/api/v1", router);

// start server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
