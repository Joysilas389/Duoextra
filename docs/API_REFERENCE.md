# DuoExtra API Reference

Base URL: `http://localhost:4000/api`
Swagger UI: `http://localhost:4000/api/docs`

## Authentication

### POST /auth/register
Register a new user account.
```json
{ "email": "user@example.com", "password": "SecurePass123!", "displayName": "Maria" }
```

### POST /auth/login
Authenticate and get tokens.
```json
{ "email": "user@example.com", "password": "SecurePass123!" }
```
Response: `{ accessToken, refreshToken, user: { id, email, role, displayName } }`

### POST /auth/refresh
Refresh an expired access token.
```json
{ "refreshToken": "uuid-refresh-token" }
```

### POST /auth/logout
Invalidate refresh token.

### GET /auth/me
Get current authenticated user. Requires Bearer token.

---

## Users

### GET /users/me
Get current user profile with goals, subscription, streak.

### GET /users/dashboard
Get learner dashboard data: streak, XP, vocab due, recent activity.

### PUT /users/profile
Update profile fields: displayName, timezone, dailyGoalMinutes, etc.

---

## Onboarding

### POST /onboarding/questionnaire
Save onboarding questionnaire responses.
```json
{ "learningPurpose": "exam", "examProvider": "goethe", "targetLevel": "B1", "dailyGoalMinutes": 15 }
```

### POST /onboarding/placement
Submit placement test answers for level estimation.
```json
{ "answers": [{ "exerciseId": "uuid", "answer": "Das" }] }
```
Response: `{ score: 0.45, level: "A2", correct: 9, total: 20 }`

---

## Pathways

### GET /pathways
List learning pathways. Query: `?type=CEFR_GENERAL&level=B1`

### GET /pathways/:slug
Get pathway with units and lessons.

---

## Lessons

### GET /lessons
List lessons. Query: `?skill=GRAMMAR&level=A2&type=structured&page=1`

### GET /lessons/:slug
Get lesson with steps and exercises.

### GET /lessons/next-recommended
Get AI-recommended next lesson for user.

### POST /lessons/:id/complete
Mark lesson complete with accuracy and time data.

---

## Vocabulary

### GET /vocabulary/items
Get vocabulary items. Query: `?level=A1&page=1`

### GET /vocabulary/reviews/due
Get items due for SRS review.

### POST /vocabulary/reviews/:vocabId
Submit review result. Body: `{ "quality": 3 }` (1-5 scale, SM-2)

### POST /vocabulary/saved/:vocabId
Save word to personal list.

### GET /vocabulary/saved
Get saved words.

### GET /vocabulary/stats
Get vocabulary statistics: total, learning, reviewing, mastered.

---

## Grammar

### GET /grammar
List grammar topics. Query: `?level=A2&category=verbs`

### GET /grammar/:slug
Get grammar topic detail with explanation and examples.

---

## Writing

### GET /writing/prompts
List writing prompts. Query: `?level=B1&textType=email`

### GET /writing/prompts/:id
Get single prompt.

### POST /writing/submit
Submit writing for AI evaluation.
```json
{ "promptId": "uuid", "text": "Sehr geehrte...", "timeSpent": 600 }
```

### GET /writing/submissions
Get user's writing submissions with feedback.

### GET /writing/feedback/:submissionId
Get detailed feedback for a submission.

---

## Speaking

### GET /speaking/prompts
List speaking prompts. Query: `?level=A2&taskType=roleplay`

### POST /speaking/submit
Submit recording for evaluation.
```json
{ "promptId": "uuid", "audioUrl": "s3://...", "duration": 45 }
```

### GET /speaking/submissions
Get user's speaking submissions.

---

## Conversations (Original Content)

### GET /conversations
List conversations. Query: `?scenario=doctor_visit&level=A2&formality=formal`

### GET /conversations/scenarios
Get all available scenario categories.

### GET /conversations/:slug
Get conversation with turns and key phrases.

---

## Mock Exams

### GET /mock-exams/templates
List available mock exam templates. Query: `?provider=goethe&level=B1`

### POST /mock-exams/start/:templateId
Start a new mock exam attempt.

### PUT /mock-exams/:attemptId/sections/:sectionId
Auto-save section answers.

### POST /mock-exams/:attemptId/submit
Submit completed exam for scoring.

### GET /mock-exams/:attemptId/results
Get exam results with section breakdown.

### GET /mock-exams/history
Get user's mock exam history.

---

## Analytics

### GET /analytics/me
Get learner analytics: XP, time, skill breakdown, weekly activity, vocab stats, mock trend.

---

## Gamification

### GET /gamification/badges
Get user's earned badges.

### GET /gamification/leaderboard
Get XP leaderboard (top 20).

---

## Notifications

### GET /notifications
Get user notifications.

### PUT /notifications/:id/read
Mark notification as read.

---

## AI Tutor

### POST /ai-tutor/conversations
Create new AI conversation. Body: `{ "mode": "grammar" }`

### POST /ai-tutor/conversations/:id/message
Send message to AI tutor. Body: `{ "message": "Explain dative case" }`

### GET /ai-tutor/conversations
List user's AI conversations.

---

## Admin (Requires SUPER_ADMIN or CONTENT_EDITOR role)

### GET /admin/dashboard
Admin stats: user count, lesson count, exercise count, submissions.

### GET /admin/providers
List exam providers with exams.

### POST /admin/providers
Create exam provider.

### POST /admin/lessons
Create lesson.

### PUT /admin/lessons/:id
Update lesson.

### POST /admin/exercises
Create exercise.

### POST /admin/content/:entityType/:entityId/publish
Publish content with versioning.
