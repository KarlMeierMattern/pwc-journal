# 🚀 Development Roadmap: Private Journal App

## Overview

Detailed step-by-step plan to build a private journaling app with authentication, CRUD operations, LLM insights, and modern tech stack.

---

## Phase 1: Database & Environment Setup

### Step 1.1: Database Schema Setup

**Files to create:**

- `db/schema/users.ts` - User model with Drizzle
- `db/schema/journal-entries.ts` - JournalEntry model
- `db/schema/llm-cache.ts` - LLMCache model
- `db/schema/index.ts` - Export all schemas
- `db/migrations/` - Auto-generated migration files

**Dependencies to install:**

```bash
# Backend dependencies
cd backend
npm install drizzle-orm mysql2 drizzle-kit redis ioredis
npm install -D @types/mysql2 @types/redis
```

**Environment files to create:**

- `backend/.env` - Backend environment variables
- `frontend/.env` - Frontend environment variables
- `db/.env` - Database connection details

### Step 1.2: Database Configuration

**Files to create:**

- `backend/src/config/database.ts` - MySQL connection using Drizzle
- `backend/src/config/redis.ts` - Redis connection setup
- `drizzle.config.ts` - Drizzle Kit configuration

### Step 1.3: Database Migration Setup

**Commands to run:**

```bash
# Generate initial migration
npx drizzle-kit generate:mysql
# Push to database
npx drizzle-kit push:mysql
```

---

## Phase 2: Authentication System

### Step 2.1: Backend Auth Infrastructure

**Files to create:**

- `backend/src/middleware/auth.ts` - JWT middleware for protected routes
- `backend/src/utils/jwt.ts` - JWT token generation/validation utilities
- `backend/src/utils/password.ts` - Password hashing utilities using bcrypt
- `backend/src/routes/auth.ts` - Auth routes (signup, login, logout, me)
- `backend/src/controllers/auth-controller.ts` - Auth business logic

**Dependencies to install:**

```bash
cd backend
npm install bcryptjs jsonwebtoken cookie-parser
npm install -D @types/bcryptjs @types/jsonwebtoken @types/cookie-parser
```

**Routes to implement:**

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login with JWT cookie
- `POST /api/v1/auth/logout` - Clear JWT cookie
- `GET /api/v1/auth/me` - Get current user profile

### Step 2.2: Frontend Auth Setup

**Dependencies to install:**

```bash
cd frontend
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install react-hook-form @hookform/resolvers zod
```

**Files to create:**

- `frontend/src/hooks/use-auth.ts` - Auth context and hooks
- `frontend/src/context/auth-context.tsx` - Auth provider component
- `frontend/src/utils/api.ts` - API client with React Query setup
- `frontend/src/types/auth.ts` - TypeScript auth interfaces

### Step 2.3: Auth UI Components

**Files to create:**

- `frontend/src/components/auth/login-form.tsx` - LoginForm component using react-hook-form + Zod validation
- `frontend/src/components/auth/signup-form.tsx` - SignupForm component
- `frontend/src/components/ui/button.tsx` - shadcn Button component
- `frontend/src/components/ui/input.tsx` - shadcn Input component
- `frontend/src/components/ui/form.tsx` - shadcn Form components
- `frontend/src/pages/login.tsx` - Login page
- `frontend/src/pages/signup.tsx` - Signup page

**shadcn/ui components to install:**

```bash
cd frontend
npx shadcn-ui@latest add button input form label card
```

### Step 2.4: Protected Route Setup

**Files to create:**

- `frontend/src/components/auth/protected-route.tsx` - ProtectedRoute component
- `frontend/src/components/auth/auth-guard.tsx` - AuthGuard wrapper component

---

## Phase 3: Basic Journal CRUD Operations

### Step 3.1: Backend Journal API

**Files to create:**

- `backend/src/routes/journal.ts` - Journal CRUD routes
- `backend/src/controllers/journal-controller.ts` - Journal business logic
- `backend/src/utils/validation.ts` - Journal entry validation schemas

**Routes to implement:**

- `GET /api/v1/journal` - List user's journal entries (with filters)
- `POST /api/v1/journal` - Create new journal entry
- `PUT /api/v1/journal/:id` - Update journal entry
- `DELETE /api/v1/journal/:id` - Delete journal entry
- `GET /api/v1/journal/:id` - Get single journal entry

### Step 3.2: Frontend Journal Data Layer

**Files to create:**

- `frontend/src/hooks/use-journal.ts` - React Query hooks for journal operations
- `frontend/src/utils/journal-api.ts` - Journal API calls
- `frontend/src/types/journal.ts` - Journal TypeScript interfaces

**React Query hooks to implement:**

- `useJournalEntries()` - Fetch journal entries with filters
- `useCreateEntry()` - Create journal entry mutation
- `useUpdateEntry()` - Update journal entry mutation
- `useDeleteEntry()` - Delete journal entry mutation

### Step 3.3: Journal UI Components

**Files to create:**

- `frontend/src/components/journal/journal-entry-card.tsx` - JournalEntryCard component (display single entry)
- `frontend/src/components/journal/journal-entry-form.tsx` - JournalEntryForm component (create/edit form)
- `frontend/src/components/journal/journal-entry-list.tsx` - JournalEntryList component (list all entries)
- `frontend/src/components/journal/entry-filters.tsx` - EntryFilters component (date filters)
- `frontend/src/components/ui/textarea.tsx` - shadcn Textarea component

**shadcn/ui components to install:**

```bash
cd frontend
npx shadcn-ui@latest add textarea select calendar popover
```

### Step 3.4: Journal Pages

**Files to create:**

- `frontend/src/pages/dashboard.tsx` - Main dashboard with entry list
- `frontend/src/pages/journal/create.tsx` - Create new entry page
- `frontend/src/pages/journal/edit/[id].tsx` - Edit entry page
- `frontend/src/components/layout/app-layout.tsx` - Main app layout component
- `frontend/src/components/layout/sidebar.tsx` - Navigation sidebar

---

## Phase 4: LLM Integration with OpenAI Agents

### Step 4.1: OpenAI Agent Setup

**Dependencies to install:**

```bash
cd backend
npm install openai
```

**Files to create:**

- `backend/src/services/openai-service.ts` - OpenAI client configuration
- `backend/src/agents/journal-agent.ts` - OpenAI agent with database access tool
- `backend/src/tools/database-tool.ts` - Tool for agent to query journal entries
- `backend/src/routes/summaries.ts` - Summary generation routes
- `backend/src/controllers/summary-controller.ts` - Summary business logic

**Agent capabilities:**

- Query user's journal entries by date range
- Analyze patterns and themes
- Generate personalized insights
- Cache results in Redis (with refresh button to invalidate cache)

### Step 4.2: Redis Caching Layer

**Files to create:**

- `backend/src/utils/cache.ts` - Redis caching utilities
- `backend/src/services/cache-service.ts` - Summary caching logic

**Caching strategy:**

- Key format: `user:{userId}:summary:{fromDate}-{toDate}`
- TTL: 7 days
- Manual invalidation via "Refresh Summary" button in UI

### Step 4.3: Summary UI Components

**Files to create:**

- `frontend/src/components/insights/summary-card.tsx` - SummaryCard component
- `frontend/src/components/insights/summary-generator.tsx` - SummaryGenerator component (date picker + generate button)
- `frontend/src/components/insights/insights-dashboard.tsx` - InsightsDashboard component
- `frontend/src/hooks/use-summaries.ts` - React Query hooks for summaries

**Routes to implement:**

- `POST /api/v1/summaries/generate` - Generate summary for date range
- `GET /api/v1/summaries` - Get cached summaries for user

---

## Phase 5: UI/UX Enhancements

### Step 5.1: GitHub-style Heatmap Calendar

**Dependencies to install:**

```bash
cd frontend
npm install react-calendar-heatmap date-fns
npm install -D @types/react-calendar-heatmap
```

**Files to create:**

- `frontend/src/components/analytics/activity-heatmap.tsx` - ActivityHeatmap component
- `frontend/src/components/analytics/metrics-cards.tsx` - MetricsCards component (entry counts, writing streaks)
- `frontend/src/hooks/use-analytics.ts` - Analytics React Query hooks

### Step 5.2: Advanced Filtering & Search

**Files to create:**

- `frontend/src/components/journal/advanced-filters.tsx` - AdvancedFilters component (date/text search)
- `frontend/src/utils/search.ts` - Search utilities (text-based search)

**shadcn/ui components to install:**

```bash
cd frontend
npx shadcn-ui@latest add command dialog tabs
```

### Step 5.3: Dashboard Layout Improvements

**Files to create:**

- `frontend/src/components/dashboard/dashboard-header.tsx` - DashboardHeader component
- `frontend/src/components/dashboard/quick-stats.tsx` - QuickStats component
- `frontend/src/components/dashboard/recent-entries.tsx` - RecentEntries component

---

## Environment Variables Setup

### Backend `.env`:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/journal_db
DB_HOST=localhost
DB_PORT=3306
DB_USER=journal_user
DB_PASSWORD=your_password
DB_NAME=journal_db

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# Auth
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Environment
NODE_ENV=development
PORT=3001
FRONTEND_PROD_URL=https://your-frontend-domain.com
```

### Frontend `.env`:

```env
VITE_ENV=development
VITE_BACKEND_DEV_URL=http://localhost:3001
VITE_BACKEND_PROD_URL=https://your-backend-domain.com
```

### Database `.env`:

```env
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=journal_db
MYSQL_USER=journal_user
MYSQL_PASSWORD=your_password
```

---

## Testing Strategy (Optional)

### Unit Tests:

- `backend/src/__tests__/auth.test.ts` - Auth controller tests
- `backend/src/__tests__/journal.test.ts` - Journal controller tests
- `frontend/src/components/__tests__/journal-entry-form.test.tsx` - Component tests

### Integration Tests:

- `backend/src/__tests__/integration/auth-flow.test.ts` - End-to-end auth testing
- `frontend/src/__tests__/integration/journal-crud.test.tsx` - CRUD flow testing

---

## Deployment Notes

1. **Database Setup**:
   - **Development**: Use Docker MySQL container locally
   - **Production**: Create MySQL database on VPS or use managed MySQL
2. **Redis Setup**: Use Upstash Redis for both development and production
3. **Environment Variables**: Configure in Coolify for each service
4. **SSL Certificates**: Let Coolify handle SSL via Let's Encrypt
5. **Monitoring**: Use Coolify logs for debugging and monitoring

---

## Development Tips

1. **Start each phase with backend API**, then build frontend components
2. **Test API endpoints with Postman** before building UI
3. **Use React Query DevTools** for debugging data fetching
4. **Implement error boundaries** for better error handling
5. **Add loading states** for all async operations
6. **Use TypeScript strictly** - define interfaces for all data structures
