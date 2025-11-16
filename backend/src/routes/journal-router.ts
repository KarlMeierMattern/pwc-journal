import { Router } from "express";
import {
  addJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
  getLastMonthEntries,
} from "../controllers/journal-controller.js";

import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/", authMiddleware, addJournalEntry);
router.get("/last-month", authMiddleware, getLastMonthEntries);
router.get("/", authMiddleware, getJournalEntries);
router.get("/:id", authMiddleware, getJournalEntryById);
router.patch("/:id", authMiddleware, updateJournalEntry);
router.delete("/:id", authMiddleware, deleteJournalEntry);

export default router;
