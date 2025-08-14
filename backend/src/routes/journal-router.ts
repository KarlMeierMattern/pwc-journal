import { Router } from "express";
import {
  addJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
} from "../controllers/journal-controller";

import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/", authMiddleware, addJournalEntry);
router.get("/", authMiddleware, getJournalEntries);
router.get("/:id", authMiddleware, getJournalEntryById);
router.put("/:id", authMiddleware, updateJournalEntry);
router.delete("/:id", authMiddleware, deleteJournalEntry);

export default router;
