# DuoExtra — German Language Learning & Exam Preparation Platform

## Executive Summary

DuoExtra is a production-grade German language learning platform designed for learners preparing for **Goethe** and **telc** exams across CEFR levels A1–C2. It combines Duolingo-style gamification with rigorous exam preparation, real-life conversation training, and AI-assisted feedback.

### Key Differentiators
- **Exam-first architecture** — configurable exam engine supporting Goethe/telc with extensible provider framework
- **Four-skill coverage** — Listening, Reading, Writing, Speaking with dedicated modules
- **Real-life German** — 200+ original conversation scenarios for everyday situations
- **Adaptive learning** — SRS vocabulary, weak-skill detection, personalized study plans
- **AI tutor** — Grammar explanations, writing feedback, speaking evaluation, roleplay
- **Multi-tenant** — Learner, tutor, institution, and admin roles with appropriate dashboards

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Zustand, TanStack Query |
| Backend | NestJS 10, TypeScript, Prisma ORM |
| Database | PostgreSQL 16 |
| Cache/Queue | Redis 7, BullMQ |
| Storage | S3-compatible (MinIO for dev) |
| Auth | JWT + refresh tokens, RBAC |
| Realtime | WebSocket (Socket.IO) |
| API Docs | Swagger/OpenAPI |
| Deployment | Docker Compose |

## Quick Start

```bash
# Clone and install
git clone https://github.com/your-org/duoextra.git
cd duoextra

# Start infrastructure
docker-compose up -d postgres redis minio

# Backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev

# Frontend
cd ../frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
duoextra/
├── frontend/          # Next.js 14 app
├── backend/           # NestJS API
├── infra/             # Docker, nginx configs
├── docs/              # Architecture docs, API specs
├── shared/            # Shared types/constants
└── docker-compose.yml
```

## MVP Phases

### Phase 1 (Weeks 1–8)
Auth, onboarding, placement test, dashboard, learning paths, listening, reading, writing, speaking, vocabulary SRS, grammar center, mock exams, analytics basics, admin CMS, splash screen, logo, original conversation library

### Phase 2 (Weeks 9–14)
AI tutor, pronunciation scoring, tutor portal, institution features, subscriptions/payments, external content workflows

### Phase 3 (Weeks 15–20)
Community features, advanced analytics, live sessions, white-label, experimentation framework
