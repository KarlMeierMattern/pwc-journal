# 📃 Product Requirements & Technical Design

## Product Summary

A private journaling app for deep personal insights. LLM-generated summaries and GitHub-like heatmaps surface meaningful patterns. Deployable on your own VPS with custom auth.

---

## Functional Requirements

### Authentication

- Email/password signup & login with JWT (httpOnly cookies)
- OAuth social login (Google, GitHub)
- Secure logout & session management

### Journal Entries

- Create, read, update, delete journal entries
- Tag entries with multiple tags
- Entries timestamped automatically

### Summaries & Insights

- Generate LLM-based summaries for any date range
- Cache summaries with Redis
- Display metrics cards (counts, popular tags)

### UI Features

- Heatmap calendar showing daily activity
- Tag filter & date-range selector
- Responsive design (desktop priority)

---

## Non-Functional Requirements

- Fast API response (<200ms typical)
- Secure against XSS, CSRF, SQL Injection
- Scalable DB schema and caching strategy
- Reliable deployment with zero-downtime updates

---

## Project Structure

```
project-root/
├── apps/
│ ├── frontend/ # React + Vite + Tailwind + shadcn + React Router
│ └── backend/ # Express + TypeScript + Auth + API routes
├── db/
│ ├── schema/ # Drizzle schema definitions
│ └── migrations/ # Migration scripts via Drizzle Kit
├── docker/
│ ├── backend.Dockerfile
│ ├── frontend.Dockerfile
│ └── docker-compose.yml # Compose file to spin up all services locally / prod
├── scripts/ # Seed, build, deploy helper scripts
├── .env # Shared environment variables
├── .env.frontend
├── .env.backend
├── .github/
│ └── workflows/ # GitHub Actions CI/CD pipelines
└── README.md
```

---

## Data Models (Drizzle ORM)

```ts
// User model
{
  id: string; // UUID PK
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// JournalEntry model
{
  id: string; // UUID PK
  userId: string; // FK to User
  content: string;
  tags: string[]; // Optional
  createdAt: Date;
}

// LLMCache model
{
  id: string; // UUID PK
  userId: string; // FK to User
  fromDate: Date;
  toDate: Date;
  summaryText: string;
  cachedAt: Date;
}
```

## API Routes

Method | Endpoint | Description
POST | /auth/signup | Create user
POST | /auth/login | Login user
POST | /auth/logout | Logout user
GET | /auth/me | Get current user
GET | /journal | List journal entries (filters)
POST | /journal | Create journal entry
PUT | /journal/:id | Update journal entry
DELETE | /journal/:id | Delete journal entry
GET | /summary | Get LLM summary by date range

## Caching Strategy

- Redis key format: user:{userId}:summary:{from}-{to}
- Cache TTL: 7 days or on journal entry update in range → invalidate & refresh
- Serve cached summary if available to reduce API cost and latency

## Deployment & DevOps

- Use Docker Compose locally for dev environment (frontend, backend, MySQL, Redis)
- Push Docker images to registry on GitHub Actions build
- Deploy via Coolify on Hetzner VPS:
- Manage containers, env vars, volumes, logs
- Auto-provision SSL with Let’s Encrypt
- Reverse proxy routing with NGINX built-in
- Use PM2 only if Docker is not an option
