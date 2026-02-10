import express from "express";
import { getJournalSummary } from "../controllers/agent-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/journal-summary", authMiddleware, getJournalSummary);

export default router;
