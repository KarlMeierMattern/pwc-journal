import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
} from "../controllers/auth-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();

// create user
router.post("/signup", signup);

// login user
router.post("/login", login);

// logout user
router.post("/logout", logout);

// get current user
router.get("/me", authMiddleware, getMe);

export default router;
