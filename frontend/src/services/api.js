import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('duoextra_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 → refresh token flow
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem('duoextra_refresh');
        if (!refreshToken) throw new Error('No refresh token');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        localStorage.setItem('duoextra_token', data.accessToken);
        localStorage.setItem('duoextra_refresh', data.refreshToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem('duoextra_token');
        localStorage.removeItem('duoextra_refresh');
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// ─── Auth ─────────────────────────────────────
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: (refreshToken) => api.post('/auth/logout', { refreshToken }),
  me: () => api.get('/auth/me'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
};

// ─── Users / Dashboard ───────────────────────
export const usersApi = {
  getProfile: () => api.get('/users/me'),
  getDashboard: () => api.get('/users/dashboard'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// ─── Onboarding ──────────────────────────────
export const onboardingApi = {
  saveQuestionnaire: (data) => api.post('/onboarding/questionnaire', data),
  submitPlacement: (answers) => api.post('/onboarding/placement', { answers }),
};

// ─── Pathways & Lessons ──────────────────────
export const pathwaysApi = {
  getAll: (params) => api.get('/pathways', { params }),
  getBySlug: (slug) => api.get(`/pathways/${slug}`),
};

export const lessonsApi = {
  getAll: (params) => api.get('/lessons', { params }),
  getBySlug: (slug) => api.get(`/lessons/${slug}`),
  complete: (id, data) => api.post(`/lessons/${id}/complete`, data),
  getNext: () => api.get('/lessons/next-recommended'),
};

// ─── Exercises ───────────────────────────────
export const exercisesApi = {
  submit: (id, answer) => api.post(`/exercises/${id}/submit`, { answer }),
};

// ─── Vocabulary ──────────────────────────────
export const vocabularyApi = {
  getItems: (params) => api.get('/vocabulary/items', { params }),
  getDueReviews: () => api.get('/vocabulary/reviews/due'),
  submitReview: (vocabId, quality) => api.post(`/vocabulary/reviews/${vocabId}`, { quality }),
  saveWord: (vocabId, source) => api.post(`/vocabulary/saved/${vocabId}`, { source }),
  getSaved: () => api.get('/vocabulary/saved'),
  getStats: () => api.get('/vocabulary/stats'),
};

// ─── Grammar ─────────────────────────────────
export const grammarApi = {
  getTopics: (params) => api.get('/grammar', { params }),
  getBySlug: (slug) => api.get(`/grammar/${slug}`),
};

// ─── Writing ─────────────────────────────────
export const writingApi = {
  getPrompts: (params) => api.get('/writing/prompts', { params }),
  getPrompt: (id) => api.get(`/writing/prompts/${id}`),
  submit: (data) => api.post('/writing/submit', data),
  getSubmissions: () => api.get('/writing/submissions'),
  getFeedback: (submissionId) => api.get(`/writing/feedback/${submissionId}`),
};

// ─── Speaking ────────────────────────────────
export const speakingApi = {
  getPrompts: (params) => api.get('/speaking/prompts', { params }),
  submit: (data) => api.post('/speaking/submit', data),
  getSubmissions: () => api.get('/speaking/submissions'),
};

// ─── Conversations ───────────────────────────
export const conversationsApi = {
  getAll: (params) => api.get('/conversations', { params }),
  getBySlug: (slug) => api.get(`/conversations/${slug}`),
  getScenarios: () => api.get('/conversations/scenarios'),
};

// ─── Mock Exams ──────────────────────────────
export const mockExamApi = {
  getTemplates: (params) => api.get('/mock-exams/templates', { params }),
  start: (templateId) => api.post(`/mock-exams/start/${templateId}`),
  saveAnswers: (attemptId, sectionId, answers) =>
    api.put(`/mock-exams/${attemptId}/sections/${sectionId}`, { answers }),
  submit: (attemptId) => api.post(`/mock-exams/${attemptId}/submit`),
  getResults: (attemptId) => api.get(`/mock-exams/${attemptId}/results`),
  getHistory: () => api.get('/mock-exams/history'),
};

// ─── Analytics ───────────────────────────────
export const analyticsApi = {
  getLearnerAnalytics: () => api.get('/analytics/me'),
};

// ─── Gamification ────────────────────────────
export const gamificationApi = {
  getBadges: () => api.get('/gamification/badges'),
  getLeaderboard: () => api.get('/gamification/leaderboard'),
};

// ─── Notifications ───────────────────────────
export const notificationsApi = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
};

// ─── AI Tutor ────────────────────────────────
export const aiTutorApi = {
  getConversations: () => api.get('/ai-tutor/conversations'),
  createConversation: (mode) => api.post('/ai-tutor/conversations', { mode }),
  sendMessage: (convId, message) => api.post(`/ai-tutor/conversations/${convId}/message`, { message }),
};

// ─── Admin ───────────────────────────────────
export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getProviders: () => api.get('/admin/providers'),
  createLesson: (data) => api.post('/admin/lessons', data),
  updateLesson: (id, data) => api.put(`/admin/lessons/${id}`, data),
  createExercise: (data) => api.post('/admin/exercises', data),
};

export default api;
