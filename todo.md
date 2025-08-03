# 📋 Development Todo List

## Phase 1: Database & Environment Setup

### Step 1.1: Database Schema Setup

- [✅] Install backend dependencies: `drizzle-orm mysql2 drizzle-kit redis ioredis`
- [✅] Create `backend/src/db/schema/users.ts` - User model with Drizzle
- [✅] Create `backend/src/db/schema/journal-entries.ts` - JournalEntry model
- [✅] Create `backend/src/db/schema/llm-cache.ts` - LLMCache model
- [✅] Create `backend/src/db/schema/index.ts` - Export all schemas
- [❌] Create backend environment variables in `.env`
- [❌] Create frontend environment variables in `.env`

### Step 1.2: Database Configuration

- [❌] Create `backend/src/config/database.ts` - MySQL connection using Drizzle
- [❌] Create `backend/src/config/redis.ts` - Redis connection setup
- [❌] Create `drizzle.config.ts` - Drizzle Kit configuration
- [❌] Set up MySQL database on VPS or locally

### Step 1.3: Database Migration Setup

- [❌] Run `npx drizzle-kit generate:mysql` - Generate initial migration
- [❌] Run `npx drizzle-kit push:mysql` - Push to database
- [❌] Test database connection and verify tables created

---

## Phase 2: Authentication System

### Step 2.1: Backend Auth Infrastructure

- [❌] Install auth dependencies: `bcryptjs jsonwebtoken cookie-parser`
- [❌] Install dev types: `@types/bcryptjs @types/jsonwebtoken @types/cookie-parser`
- [❌] Create `backend/src/middleware/auth.ts` - JWT middleware
- [❌] Create `backend/src/utils/jwt.ts` - JWT utilities
- [❌] Create `backend/src/utils/password.ts` - Password hashing utilities
- [❌] Create `backend/src/routes/auth.ts` - Auth routes
- [❌] Create `backend/src/controllers/auth-controller.ts` - Auth business logic
- [❌] Implement `POST /api/v1/auth/signup` route
- [❌] Implement `POST /api/v1/auth/login` route
- [❌] Implement `POST /api/v1/auth/logout` route
- [❌] Implement `GET /api/v1/auth/me` route
- [❌] Test all auth endpoints with Postman

### Step 2.2: Frontend Auth Setup

- [❌] Install React Query: `@tanstack/react-query @tanstack/react-query-devtools`
- [❌] Install form dependencies: `react-hook-form @hookform/resolvers zod`
- [❌] Create `frontend/src/hooks/use-auth.ts` - Auth hooks
- [❌] Create `frontend/src/context/auth-context.tsx` - Auth provider
- [❌] Create `frontend/src/utils/api.ts` - API client with React Query
- [❌] Create `frontend/src/types/auth.ts` - Auth TypeScript interfaces

### Step 2.3: Auth UI Components

- [❌] Install shadcn components: `button input form label card`
- [❌] Create `frontend/src/components/auth/login-form.tsx` - LoginForm
- [❌] Create `frontend/src/components/auth/signup-form.tsx` - SignupForm
- [❌] Create `frontend/src/pages/login.tsx` - Login page
- [❌] Create `frontend/src/pages/signup.tsx` - Signup page
- [❌] Test login/signup flow end-to-end

### Step 2.4: Protected Route Setup

- [❌] Create `frontend/src/components/auth/protected-route.tsx` - ProtectedRoute
- [❌] Create `frontend/src/components/auth/auth-guard.tsx` - AuthGuard
- [❌] Test protected routes redirect to login when unauthenticated

---

## Phase 3: Basic Journal CRUD Operations

### Step 3.1: Backend Journal API

- [❌] Create `backend/src/routes/journal.ts` - Journal CRUD routes
- [❌] Create `backend/src/controllers/journal-controller.ts` - Journal logic
- [❌] Create `backend/src/utils/validation.ts` - Validation schemas
- [❌] Implement `GET /api/v1/journal` - List entries with filters
- [❌] Implement `POST /api/v1/journal` - Create entry
- [❌] Implement `PUT /api/v1/journal/:id` - Update entry
- [❌] Implement `DELETE /api/v1/journal/:id` - Delete entry
- [❌] Implement `GET /api/v1/journal/:id` - Get single entry
- [❌] Test all journal endpoints with Postman

### Step 3.2: Frontend Journal Data Layer

- [❌] Create `frontend/src/hooks/use-journal.ts` - React Query journal hooks
- [❌] Create `frontend/src/utils/journal-api.ts` - Journal API calls
- [❌] Create `frontend/src/types/journal.ts` - Journal interfaces
- [❌] Implement `useJournalEntries()` hook
- [❌] Implement `useCreateEntry()` mutation
- [❌] Implement `useUpdateEntry()` mutation
- [❌] Implement `useDeleteEntry()` mutation

### Step 3.3: Journal UI Components

- [❌] Install shadcn components: `textarea select calendar popover`
- [❌] Create `frontend/src/components/journal/journal-entry-card.tsx`
- [❌] Create `frontend/src/components/journal/journal-entry-form.tsx`
- [❌] Create `frontend/src/components/journal/journal-entry-list.tsx`
- [❌] Create `frontend/src/components/journal/entry-filters.tsx` - Date filters only

### Step 3.4: Journal Pages

- [❌] Create `frontend/src/pages/dashboard.tsx` - Main dashboard
- [❌] Create `frontend/src/pages/journal/create.tsx` - Create entry page
- [❌] Create `frontend/src/pages/journal/edit/[id].tsx` - Edit entry page
- [❌] Create `frontend/src/components/layout/app-layout.tsx` - App layout
- [❌] Create `frontend/src/components/layout/sidebar.tsx` - Navigation
- [❌] Test complete journal CRUD flow in browser

---

## Phase 4: LLM Integration with OpenAI Agents

### Step 4.1: OpenAI Agent Setup

- [❌] Install OpenAI: `npm install openai`
- [❌] Create `backend/src/services/openai-service.ts` - OpenAI client
- [❌] Create `backend/src/agents/journal-agent.ts` - Agent with DB tool
- [❌] Create `backend/src/tools/database-tool.ts` - DB access tool
- [❌] Create `backend/src/routes/summaries.ts` - Summary routes
- [❌] Create `backend/src/controllers/summary-controller.ts` - Summary logic
- [❌] Test agent can query journal entries by date range

### Step 4.2: Redis Caching Layer

- [❌] Create `backend/src/utils/cache.ts` - Redis utilities
- [❌] Create `backend/src/services/cache-service.ts` - Caching logic
- [❌] Implement cache key format: `user:{userId}:summary:{fromDate}-{toDate}`
- [❌] Implement 7-day TTL for cached summaries
- [❌] Implement "Refresh Summary" button for manual cache invalidation

### Step 4.3: Summary UI Components

- [❌] Create `frontend/src/components/insights/summary-card.tsx`
- [❌] Create `frontend/src/components/insights/summary-generator.tsx`
- [❌] Create `frontend/src/components/insights/insights-dashboard.tsx`
- [❌] Create `frontend/src/hooks/use-summaries.ts` - Summary hooks
- [❌] Implement `POST /api/v1/summaries/generate` route
- [❌] Implement `GET /api/v1/summaries` route
- [❌] Test LLM summary generation end-to-end

---

## Phase 5: UI/UX Enhancements

### Step 5.1: GitHub-style Heatmap Calendar

- [❌] Install heatmap dependencies: `react-calendar-heatmap date-fns`
- [❌] Install types: `@types/react-calendar-heatmap`
- [❌] Create `frontend/src/components/analytics/activity-heatmap.tsx`
- [❌] Create `frontend/src/components/analytics/metrics-cards.tsx`
- [❌] Create `frontend/src/hooks/use-analytics.ts` - Analytics hooks
- [❌] Test heatmap shows daily journal activity

### Step 5.2: Advanced Filtering & Search

- [❌] Install shadcn components: `command dialog tabs`
- [❌] Create `frontend/src/components/journal/advanced-filters.tsx` - Date/text search
- [❌] Create `frontend/src/utils/search.ts` - Text-based search utilities
- [❌] Test search and filtering functionality

### Step 5.3: Dashboard Layout Improvements

- [❌] Create `frontend/src/components/dashboard/dashboard-header.tsx`
- [❌] Create `frontend/src/components/dashboard/quick-stats.tsx`
- [❌] Create `frontend/src/components/dashboard/recent-entries.tsx`
- [❌] Test complete dashboard layout and responsiveness

---

## Deployment & Environment Setup

### Production Environment

- [❌] Set up MySQL database on VPS
- [❌] Set up Redis on VPS
- [❌] Configure environment variables in Coolify
- [❌] Test backend deployment with database connections
- [❌] Test frontend deployment with API integration
- [❌] Configure SSL certificates via Let's Encrypt
- [❌] Test complete production deployment

### Testing & Quality Assurance

- [❌] Set up React Query DevTools
- [❌] Implement error boundaries for auth components
- [❌] Implement error boundaries for journal components
- [❌] Add loading states for all async operations
- [❌] Test all error scenarios (network failures, auth failures)
- [❌] Verify TypeScript strict mode compliance

---

## Completed

- [✅] Frontend setup (React + Vite + Tailwind + React Router)
- [✅] Backend Express server with base routing
- [✅] CORS configuration for development and production
- [✅] Environment variable setup for dev/prod
- [✅] Initial deployment to Hetzner VPS via Coolify
