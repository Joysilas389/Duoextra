# DuoExtra — Architecture & Implementation Guide

## 1. System Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)               │
└───────────┬──────────────────────┬────────────────────┘
            │                      │
    ┌───────▼───────┐    ┌────────▼────────┐
    │   Next.js 14  │    │    NestJS API   │
    │  (Frontend)   │    │   (Backend)     │
    │   Port 3000   │    │   Port 4000     │
    └───────────────┘    └──┬─────┬──┬─────┘
                            │     │  │
              ┌─────────────┘     │  └──────────────┐
              ▼                   ▼                  ▼
    ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
    │  PostgreSQL   │   │    Redis     │   │  MinIO (S3)  │
    │  (Database)   │   │  (Cache/Q)   │   │  (Media)     │
    └──────────────┘   └──────────────┘   └──────────────┘
```

## 2. Backend Module Architecture

Each domain module follows clean architecture:

```
modules/
  {domain}/
    {domain}.module.ts      ← NestJS module registration
    {domain}.controller.ts  ← HTTP endpoints, validation
    {domain}.service.ts     ← Business logic
    dto/                    ← Data transfer objects
    entities/               ← Domain entities (if needed beyond Prisma)
    guards/                 ← Domain-specific authorization
```

### Module Dependency Graph
- **auth** → prisma, jwt, config
- **users** → prisma, auth
- **onboarding** → prisma, users
- **pathways** → prisma
- **lessons** → prisma, exercises
- **exercises** → prisma, item-bank
- **vocabulary** → prisma (SRS algorithm built-in)
- **writing** → prisma, ai-services, media
- **speaking** → prisma, ai-services, media
- **mock-exam** → prisma, exercises, item-bank
- **gamification** → prisma, redis
- **analytics** → prisma, redis (cached aggregations)
- **ai-tutor** → prisma, external AI API
- **notifications** → prisma, bullmq, redis
- **admin** → prisma, content-versioning

## 3. Database Design Principles

- **UUID primary keys** for all tables
- **Soft deletes** via `isActive` flags where appropriate
- **Audit trail** via `audit_logs` table
- **Content versioning** via `content_versions` table
- **JSON columns** for flexible metadata (exercise content, rubric criteria)
- **Proper indexing** on foreign keys and query-hot columns
- **CEFR level as enum** for type safety

### Key Relationships
- User → Profile (1:1)
- User → Goals (1:1)
- User → Submissions (1:N)
- User → VocabularyReviews (1:N via SRS)
- Pathway → Units → Lessons → Steps → Exercises
- ExamProvider → ExamDefinitions → ExamModules → ExamSubtests
- MockExamTemplate → MockExamAttempts → MockExamSections

## 4. Frontend Architecture

### Route Structure (Next.js App Router)
```
app/
  page.jsx              ← Landing page (public)
  login/page.jsx        ← Auth
  register/page.jsx     ← Auth
  onboarding/page.jsx   ← Post-registration flow
  dashboard/
    layout.jsx          ← Authenticated layout with sidebar
    page.jsx            ← Learner dashboard
    learn/              ← Learning paths
    listening/          ← Listening practice
    reading/            ← Reading practice
    writing/            ← Writing editor + submissions
    speaking/           ← Speaking recorder + prompts
    conversations/      ← Real-life scenarios
    grammar/            ← Grammar center
    vocabulary/         ← SRS flashcards
    pronunciation/      ← Pronunciation drills
    mock-exams/         ← Mock exam engine
    analytics/          ← Progress analytics
    achievements/       ← Badges & streaks
    ai-tutor/           ← AI chat interface
    notifications/      ← Notification center
    settings/           ← Profile & preferences
```

### State Management
- **Zustand** for global auth state
- **TanStack Query** for server state (API data)
- **Local state** for UI interactions

### API Integration
- Central `api.js` client with Axios
- JWT auto-injection via interceptors
- Automatic token refresh on 401

## 5. Exam Engine Design

The exam engine is provider-agnostic and configurable:

```
ExamProvider (goethe, telc)
  └─ ExamDefinition (Goethe B1, telc B2, etc.)
       └─ ExamModule (Lesen, Hören, Schreiben, Sprechen)
            └─ ExamSubtest (Teil 1, Teil 2, etc.)
                 ├─ taskType
                 ├─ itemCount
                 ├─ points
                 ├─ duration
                 └─ metadata (replay rules, navigation lock, etc.)
```

### Mock Exam Flow
1. User selects template → `POST /mock-exams/start/{templateId}`
2. Items pulled from item bank based on template config
3. Sections rendered sequentially with timer
4. Auto-save answers periodically
5. On timeout/submit → `POST /mock-exams/{id}/submit`
6. Scoring engine calculates per-section and total scores
7. Results page with section breakdown + review mode

## 6. Adaptive Learning Engine

### SRS (Spaced Repetition System)
- SM-2 algorithm for vocabulary scheduling
- Quality ratings: 1 (Again) through 5 (Easy)
- Ease factor adjusts per card
- Interval grows exponentially for well-known items

### Weak Area Detection
- Track accuracy by: skill, grammar tag, vocab theme, task type
- Flag areas below 70% accuracy threshold
- Generate targeted remediation sets
- Surface weak areas on dashboard

### Study Plan Generation
1. Assess current level (placement test)
2. Set target level + exam date
3. Calculate required daily effort
4. Prioritize: weak skills > new content > review
5. Schedule mock exams at intervals

## 7. AI Integration Points

| Feature | AI Task | Backend Job |
|---------|---------|-------------|
| Writing feedback | Grammar, coherence, rubric scoring | BullMQ async |
| Speaking feedback | Pronunciation, fluency, transcription | BullMQ async |
| AI Tutor chat | Conversation, explanation, roleplay | Real-time API |
| Placement test scoring | Adaptive difficulty estimation | Sync |
| Exam readiness | Predictive scoring | Scheduled |

## 8. External Content Integration

### Content Source Lifecycle
```
Register source → Admin approval → Metadata sync → Preview cards → Publication
```

### Content Status Flags
- `original` — DuoExtra-created content
- `licensed` — Content with explicit license agreement
- `linked` — External content with attribution + canonical URL
- `ai_generated` — AI-generated internal content

## 9. Security Checklist

- [x] JWT with short-lived access tokens (15min)
- [x] Refresh token rotation
- [x] Password hashing with bcrypt (12 rounds)
- [x] RBAC on all endpoints
- [x] Input validation (class-validator)
- [x] CORS configured
- [x] Helmet security headers
- [x] Rate limiting (ready to configure)
- [x] SQL injection prevention (Prisma ORM)
- [x] XSS prevention (React auto-escaping)
- [x] GDPR considerations (data export, deletion ready)

## 10. Deployment

### Docker Compose (Development)
```bash
docker-compose up -d
```

### Production Considerations
- Use managed PostgreSQL (AWS RDS, Supabase)
- Use managed Redis (ElastiCache, Upstash)
- Use S3 for media storage
- Deploy frontend on Vercel
- Deploy backend on Railway/Render/ECS
- Use CDN for static assets
- Enable PgBouncer for connection pooling
- Set up monitoring (Datadog, Sentry)

## 11. Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| Unit | Jest | Services, utils, algorithms |
| Integration | Supertest | API endpoints with test DB |
| E2E | Playwright | Critical user flows |
| Component | React Testing Library | UI components |

### Priority Test Scenarios
1. Auth flow (register, login, refresh, logout)
2. SRS algorithm correctness
3. Mock exam lifecycle (start → answer → submit → score)
4. Writing submission → AI feedback pipeline
5. Dashboard data aggregation
6. RBAC enforcement on admin endpoints
