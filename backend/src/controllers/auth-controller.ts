import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NextFunction } from "express";
import { hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { db } from "../config/database";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email and password are required" });
    }

    // check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // update with hased password and create user
    const [newUser] = await db.insert(users).values({
      email,
      passwordHash: hashedPassword,
    });

    // generate token
    const token = generateToken(
      { userId: newUser.insertId, email },
      process.env.JWT_SECRET || ""
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   domain: process.env.COOKIE_DOMAIN,
    });

    // return user
    res.status(StatusCodes.CREATED).json({
      user: {
        id: newUser.insertId,
        email,
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response) => {};

export const logout = async (req: Request, res: Response) => {};

export const getMe = async (req: Request, res: Response) => {};
