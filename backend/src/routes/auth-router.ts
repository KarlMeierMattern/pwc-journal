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

// Log all requests to auth routes
// router.use((req, res, next) => {
//   console.log(`[auth-router] ===== ${req.method} ${req.path} =====`);
//   console.log(`[auth-router] Request body:`, JSON.stringify(req.body, null, 2));
//   console.log(`[auth-router] Request query:`, req.query);
//   next();
// });

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);
router.patch("/grade", authMiddleware, updateGrade);

export default router;
