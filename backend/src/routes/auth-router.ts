import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  updateGrade,
} from "../controllers/auth-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);
router.patch("/grade", authMiddleware, updateGrade);

export default router;
