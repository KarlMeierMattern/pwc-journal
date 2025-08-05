import express from "express";
import { signup, login, logout, getMe } from "../controllers/auth-controller";

const router = express.Router();

// create user
router.post("/auth/signup", signup);

// login user
router.post("/auth/login", login);

// logout user
router.post("/auth/logout", logout);

// get current user
router.get("/auth/me", getMe);

export default router;
