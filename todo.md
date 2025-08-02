You can begin templating:

[✅] Frontend setup (apps/frontend)
[✅] Backend Express server with base routing (apps/backend)
[✅] API route scaffolding (/routes/logs.ts, /routes/summaries.ts)
[❌] Shared UI and utilities (packages/ui, packages/utils)
[❌] Database setup (MySQL)
[❌] Redis setup
[❌] Docker setup
[❌] GitHub Actions setup
[❌] Coolify setup
[❌] Deployment setup

## Templatised Starting Points

- `frontend/`: basic Vite React + Tailwind setup, React Router
- `backend/`: Express server with JWT cookie auth scaffold
- `db/schema`: User, JournalEntry, Tag models with Drizzle ORM
- `docker-compose.yml`: services for frontend, backend, MySQL, Redis
- `.github/workflows/deploy.yml`: Docker build & deploy via Coolify webhook
