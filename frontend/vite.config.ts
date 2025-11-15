import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    host: true, // allows 0.0.0.0
    port: 8080, // must match exposed container port
    allowedHosts: ["pwcjournal.notlocalhost.ink"], // add your domain here
  },
});
