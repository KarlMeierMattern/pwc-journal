import express from "express";
import { about } from "../controllers/index.js";

const router = express.Router();

router.get("/", about);

export default router;
