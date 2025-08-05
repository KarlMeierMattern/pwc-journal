import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split("")[1];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};
