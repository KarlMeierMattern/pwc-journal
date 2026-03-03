import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getCurrentUser,
  loginService,
  logoutService,
  signupService,
  updateGradeService,
} from "./auth-service";

describe("auth-service", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getCurrentUser", () => {
    it("returns user when response is ok", async () => {
      const user = { id: 1, email: "a@b.com", grade: "Associate" as const };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user }),
      });

      const result = await getCurrentUser();

      expect(result).toEqual(user);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/me"),
        expect.objectContaining({
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    it("throws when response is not ok", async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getCurrentUser()).rejects.toThrow(
        "Failed to fetch current user",
      );
    });
  });

  describe("signupService", () => {
    it("returns AuthResponse when response is ok", async () => {
      const authResponse = {
        user: { id: 1, email: "a@b.com", grade: null },
        message: "User created",
      };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(authResponse),
      });

      const result = await signupService({
        email: "a@b.com",
        password: "secret",
        confirmPassword: "secret",
      });

      expect(result).toEqual(authResponse);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/signup"),
        expect.objectContaining({
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: "a@b.com",
            password: "secret",
            confirmPassword: "secret",
          }),
        }),
      );
    });

    it("throws server error body when response is not ok and body is JSON", async () => {
      const errorBody = { message: "User already exists" };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 409,
        statusText: "Conflict",
        json: () => Promise.resolve(errorBody),
      });

      await expect(
        signupService({
          email: "a@b.com",
          password: "secret",
          confirmPassword: "secret",
        }),
      ).rejects.toEqual(errorBody);
    });
  });

  describe("loginService", () => {
    it("returns AuthResponse when response is ok", async () => {
      const authResponse = {
        user: { id: 1, email: "a@b.com" },
        message: "Login successful",
      };
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(authResponse),
      });

      const result = await loginService({
        email: "a@b.com",
        password: "secret",
      });

      expect(result).toEqual(authResponse);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/login"),
        expect.objectContaining({
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ email: "a@b.com", password: "secret" }),
        }),
      );
    });

    it("throws when response is not ok", async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        json: () => Promise.resolve({ message: "Invalid password" }),
      });

      await expect(
        loginService({ email: "a@b.com", password: "wrong" }),
      ).rejects.toEqual({ message: "Invalid password" });
    });
  });

  describe("logoutService", () => {
    it("returns message when response is ok", async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "Logout successful" }),
      });

      const result = await logoutService();

      expect(result).toEqual({ message: "Logout successful" });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/logout"),
        expect.objectContaining({
          method: "POST",
          credentials: "include",
        }),
      );
    });

    it("throws when response is not ok", async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Server Error",
        json: () => Promise.reject(new Error("not json")),
      });

      await expect(logoutService()).rejects.toEqual({
        message: "HTTP 500: Server Error",
      });
    });
  });

  describe("updateGradeService", () => {
    it("returns message and grade when response is ok", async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            message: "Grade updated successfully",
            grade: "Senior Associate",
          }),
      });

      const result = await updateGradeService({ grade: "Senior Associate" });

      expect(result).toEqual({
        message: "Grade updated successfully",
        grade: "Senior Associate",
      });
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/v1/auth/grade"),
        expect.objectContaining({
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ grade: "Senior Associate" }),
        }),
      );
    });

    it("throws when response is not ok", async () => {
      (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        json: () => Promise.resolve({ message: "Invalid grade" }),
      });

      await expect(updateGradeService({ grade: "Invalid" })).rejects.toEqual({
        message: "Invalid grade",
      });
    });
  });
});
