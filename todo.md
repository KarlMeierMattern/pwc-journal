# 📋 Development Todo List

## Easy wins

- [❌] change colour scheme and style to pwc
- [❌] update placeholder text to guide user to fill out their daily journal (i.e. "what did you do today?", "what are you thinking about?", "what are you feeling?").
- [❌] show some examples of journal entries (allow user to select button to view examples).
- [❌] add mood buttons below the text area when selected there is a conversion that gets added to the journal entry
- [❌] allow user to enter their manager level and edit it

## Medium wins

- [❌] Add refresh tokens to JWT for longer sessions
- [❌] allow users to backdate journal entries / mass import
- [❌] align the output to the pwc professional framework
- [❌] create database of pwc professional framework as well as the different manager levels and their responsibilities
- [❌] have prompt summary output options (i.e. general summary, prepare for CRT performance evaluation, etc.)
- [❌] output to email / pdf
- [❌] give option to change perspective ("i", 3rd person etc.)
- [❌] ability to edit output summary and update
- [❌] allow user to add more context to the summary (and then regenerate summary)
- [❌] break out key themes into an exec summary with short description of each.
- [❌] emaill scheduling when missing daily update
- [❌] add "rewrite with AI button" on individual journal entries
- [❌] allow user to enter their goals

## Phase 1: Database & Environment Setup

### Step 1.1: Database Schema Setup

- [✅] Install backend dependencies: `drizzle-orm mysql2 drizzle-kit redis ioredis`
- [✅] Create `backend/src/db/schema/users.ts` - User model with Drizzle
- [✅] Create `backend/src/db/schema/journal-entries.ts` - JournalEntry model
- [✅] Create `backend/src/db/schema/llm-cache.ts` - LLMCache model
- [✅] Create `backend/src/db/schema/index.ts` - Export all schemas
- [✅] Create backend environment variables in `env`
- [✅] Create frontend environment variables in `env`

### Step 1.2: Database Configuration

- [✅] Create `backend/src/config/database.ts` - MySQL connection using Drizzle
- [✅] Create `backend/src/config/redis.ts` - Redis connection setup
- [✅] Create `drizzle.config.ts` - Drizzle Kit configuration
- [✅] Set up MySQL database via Docker for development

### Step 1.3: Database Migration Setup

- [✅] Run `npx drizzle-kit generate` - Generate initial migration
- [✅] Run `npx drizzle-kit push` - Push to database
- [✅] Test database connection and verify tables created

---

## Phase 2: Authentication System

### Step 2.1: Backend Auth Infrastructure

- [✅] Install auth dependencies: `bcryptjs jsonwebtoken cookie-parser`
- [✅] Install dev types: `@types/bcryptjs @types/jsonwebtoken @types/cookie-parser`
- [✅] Create `backend/src/middleware/auth.ts` - JWT middleware
- [✅] Create `backend/src/utils/jwt.ts` - JWT utilities
- [✅] Create `backend/src/utils/password.ts` - Password hashing utilities
- [✅] Create `backend/src/routes/auth.ts` - Auth routes
- [✅] Create `backend/src/controllers/auth-controller.ts` - Auth business logic
- [✅] Implement `POST /api/v1/auth/signup` route
- [✅] Implement `POST /api/v1/auth/login` route
- [✅] Implement `POST /api/v1/auth/logout` route
- [✅] Implement `GET /api/v1/auth/me` route
- [✅] Test `/api/v1/auth/signup` with Postman
- [✅] Test `/api/v1/auth/login` with Postman
- [✅] Test `/api/v1/auth/logout` with Postman
- [✅] Test `/api/v1/auth/me` with Postman

### Step 2.2: Frontend Auth Setup

- [✅] Install React Query: `@tanstack/react-query @tanstack/react-query-devtools`
- [✅] Install form dependencies: `react-hook-form @hookform/resolvers zod`
- [✅] Create `frontend/src/hooks/use-auth.ts` - Auth hooks
- [✅] Create `frontend/src/context/auth-context.tsx` - Auth provider
- [✅] Create `frontend/src/utils/api.ts` - API client with React Query
- [✅] Create `frontend/src/types/auth.ts` - Auth TypeScript interfaces

### Step 2.3: Auth UI Components

- [✅] Create button component: `button input form label card`
- [✅] Create `frontend/src/pages/login.tsx` - Login page
- [✅] Create `frontend/src/pages/signup.tsx` - Signup page
- [✅] Test login/signup flow end-to-end

### Step 2.4: Protected Route Setup

- [✅] Create `frontend/src/components/auth/protected-route.tsx` - ProtectedRoute
- [✅] Create `frontend/src/components/auth/auth-guard.tsx` - AuthGuard
- [✅] Test protected routes redirect to login when unauthenticated

---

## Phase 3: Basic Journal CRUD Operations

### Step 3.1: Backend Journal API

- [✅] Create `backend/src/routes/journal.ts` - Journal CRUD routes
- [✅] Create `backend/src/controllers/journal-controller.ts` - Journal logic
- [✅] Implement `POST /api/v1/journal` - Create entry
- [✅] Implement `GET /api/v1/journal` - List entries with basic filters (date, limit, page)
- [✅] Implement `GET /api/v1/journal/:id` - Get single entry
- [✅] Implement `PUT /api/v1/journal/:id` - Update entry
- [✅] Implement `DELETE /api/v1/journal/:id` - Delete entry
- [✅] Test all journal endpoints with Postman

### Step 3.2: Frontend Journal Data Layer

- [✅] Create `frontend/src/hooks/use-journal.ts` - React Query journal hooks
- [✅] Create `frontend/src/types/journal.ts` - Journal interfaces
- [✅] Implement `useCreateEntry()` mutation
- [✅] Implement `useJournalEntries()` hook
- [✅] Implement `useJournalEntry()` hook
- [✅] Implement `useUpdateEntry()` mutation
- [✅] Implement `useDeleteEntry()` mutation

### Step 3.3: Journal UI Components

- [✅] Install shadcn components: `textarea select calendar popover`
- [✅] Create `frontend/src/components/journal/journal-entry-card.tsx`
- [✅] Create `frontend/src/components/journal/journal-entry-form.tsx`
- [✅] Create `frontend/src/components/journal/journal-entry-list.tsx`
- [✅] Create `frontend/src/components/journal/entry-filters.tsx` - Date filters only

### Step 3.4: Journal Pages

- [✅] Create `frontend/src/pages/dashboard.tsx` - Main dashboard
- [✅] Test complete journal CRUD flow in browser

---

## Phase 4: LLM Integration with OpenAI Agents

### Step 4.1: OpenAI Agent Setup

- [✅] Install OpenAI: `npm install openai`
- [✅] Create `backend/src/agents/journal-agent.ts` - Agent with DB tool
- [✅] Create `backend/src/routes/agent-router.ts` - Summary routes
- [✅] Create `backend/src/controllers/agent-controller.ts` - Summary logic
- [✅] Test agent can query journal entries by date range

---

## Phase 5: UI/UX Enhancements

### Step 5.1: GitHub-style Heatmap Calendar

- [✅] Install heatmap dependencies: `react-calendar-heatmap date-fns`
- [✅] Create `frontend/src/components/analytics/github-chart.tsx`
- [✅] Test GitHub chart shows daily journal activity

---

## Phase 6: Security & Production Hardening

### Step 6.1: Rate limiting

- [✅] Install rate limit dependencies: `express-rate-limit`
- [✅] Create `backend/src/index.ts` - Rate limiting for all routes, auth routes, and agent routes
- [✅] Test rate limiting works

---

## Deployment & Environment Setup

### Production Environment

- [✅] Set up MySQL database on VPS (production only)
- [✅] Configure environment variables in Coolify
- [✅] Test backend deployment with database connections
- [✅] Test frontend deployment with API integration
- [✅] Configure SSL certificates via Let's Encrypt
- [✅] Test complete production deployment

---
