import { Router } from "express";
import {
  addJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
} from "../controllers/journal-controller";

const router = Router();

router.post("/", addJournalEntry);
router.get("/", getJournalEntries);
router.get("/:id", getJournalEntryById);
router.put("/:id", updateJournalEntry);
router.delete("/:id", deleteJournalEntry);

export default router;
