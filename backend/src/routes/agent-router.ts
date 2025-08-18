import express from "express";
import { getJournalSummary } from "../controllers/agent-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`🛣️ Agent router hit: ${req.method} ${req.path}`);
  next();
});

router.post("/journal-summary", authMiddleware, getJournalSummary);

export default router;
