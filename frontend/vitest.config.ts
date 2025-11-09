/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    // setupFiles: ["./src/test/setup.ts"],
  },
  preview: {
    host: true, // allows 0.0.0.0
    port: 8080, // must match exposed container port
    allowedHosts: ["pwcjournal.notlocalhost.ink"], // add your domain here
  },
});
