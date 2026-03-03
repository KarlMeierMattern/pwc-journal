# PwC Journal

A private journaling app for deep personal insights. LLM-generated summaries and GitHub-like heatmaps surface meaningful patterns. Deployable on your own infrastructure with custom auth.

## Features

- **Journal entries** – Create, edit, delete entries with date filtering
- **LLM summaries** – AI-powered analysis aligned to PwC professional framework
- **Activity heatmap** – GitHub-style contribution chart
- **Auth** – Email/password signup and login (JWT, HTTP-only cookies)
- **Grade context** – User grade setting for tailored summaries

## Tech Stack

| Layer    | Stack                                            |
| -------- | ------------------------------------------------ |
| Frontend | React 19, Vite, React Query, Tailwind, shadcn/ui |
| Backend  | Express 5, Drizzle, MySQL, Redis (Upstash)       |
| LLM      | OpenAI Agents SDK                                |
| Deploy   | Vercel (frontend), VPS (backend)                 |

## Quick Start

### Prerequisites

- Node.js 18+
- MySQL
- [Upstash Redis](https://upstash.com) (optional, for cache)
- OpenAI API key

### Backend

```bash
cd backend
# Create .env with DB_URL (or DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME), JWT_SECRET, OPENAI_API_KEY
# Optional: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
npm install
npm run dev            # http://localhost:3000
```

### Frontend

```bash
cd frontend
# Create .env with VITE_BACKEND_DEV_URL (e.g. http://localhost:3000), VITE_ENV=development
npm install
npm run dev            # http://localhost:5173
```

### Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Project Structure

```
pwc-journal/
├── frontend/          # Vite + React SPA
├── backend/           # Express API
├── ARCHITECTURE.md    # Architectural choices and design
└── README.md
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) – Architecture, modules, API, deployment
