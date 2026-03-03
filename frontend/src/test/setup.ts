import { vi } from "vitest";

// Stub env so service layer has a defined API_BASE_URL when modules load
vi.stubEnv("VITE_ENV", "development");
vi.stubEnv("VITE_BACKEND_DEV_URL", "http://localhost:3000");
