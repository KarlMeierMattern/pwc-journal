# 📦 Tech Stack Overview

## Frontend

[✅] **Framework:** React
[✅] **Bundler:** Vite
[✅] **Routing:** React Router
[✅] **Styling:** Tailwind CSS + shadcn/ui
[❌] **State Management:** React Context, `useReducer` (simple), Redux (only if complex)
[❌] **Data Fetching:** React Query (`@tanstack/react-query`)
[❌] **Auth:** Cookie-based JWT auth (custom) + social login support (passport.js or similar)
[❌] **Testing:** Vitest (unit), Playwright (e2e)

## Backend

[✅] **Runtime:** Node.js
[✅] **Framework:** Express.js
[✅] **Language:** TypeScript
[❌] **ORM:** Drizzle ORM (with Drizzle Kit for migrations)
[❌] **Auth:** Custom JWT + HttpOnly cookies, OAuth social login integration
[❌] **Validation:** Zod
[❌] **Queueing:** BullMQ (for async jobs like LLM processing)
[❌] **Security:** Helmet, CORS, Rate limiting, CSRF protection

## Database

[❌] **Primary DB:** MySQL (self-hosted on VPS or managed)
[❌] **ORM:** Drizzle ORM
[❌] **Migrations:** Drizzle Kit

## Infrastructure & Hosting

[✅] **Server:** Hetzner VPS
[✅] **Management:** Coolify for container orchestration, environment vars, logs, deployments
[✅] **Reverse Proxy:** NGINX (managed by Coolify)
[❌] **Process Manager:** PM2 (optional fallback)
[✅] **CI/CD:** GitHub Actions → Coolify

## Caching & Performance

[❌] **Cache:** Redis (for LLM outputs, rate limiting)
[❌] **CDN:** Cloudflare (optional DNS + CDN)

## Security

[❌] HTTPS via NGINX + Let’s Encrypt
[❌] Secure HTTP headers (Helmet)
[❌] Input validation and sanitization (Zod)
[❌] Rate limiting and CSRF protection

---
