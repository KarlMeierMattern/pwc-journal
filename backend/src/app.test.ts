// Testing /api/v1/auth/me route

import request from "supertest";
import { describe, test, expect } from "vitest";
import { app } from "./app.js";
import { generateToken } from "./utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

describe("GET /api/v1/auth/me", () => {
  test("returns ok: true with status 200", async () => {
    const token = generateToken(
      { userId: 20, email: "karlmeiermattern@gmail.com" },
      process.env.JWT_SECRET || ""
    );
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Cookie", `token=${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      user: { id: 20, email: "karlmeiermattern@gmail.com" },
    });
  });
});
