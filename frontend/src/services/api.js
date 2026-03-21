const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('duoextra_token') : null;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 401) {
    if (typeof window !== 'undefined') { localStorage.removeItem('duoextra_token'); window.location.href = '/login'; }
    throw new Error('Unauthorized');
  }
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || `API Error ${res.status}`); }
  return res.json();
}

const get = (path) => apiFetch(path);
const post = (path, data) => apiFetch(path, { method: 'POST', body: JSON.stringify(data) });
const put = (path, data) => apiFetch(path, { method: 'PUT', body: JSON.stringify(data) });

export const authApi = {
  me: () => get('/auth/me'),
};

export const usersApi = {
  getProfile: () => get('/users/me'),
  getDashboard: () => get('/users/dashboard'),
  updateProfile: (data) => put('/users/profile', data),
};

export const onboardingApi = {
  saveQuestionnaire: (data) => post('/onboarding/questionnaire', data),
};

export const pathwaysApi = { getAll: () => get('/pathways') };
export const lessonsApi = { getAll: (params) => get('/lessons?' + new URLSearchParams(params || {})), getBySlug: (slug) => get(`/lessons/${slug}`) };
export const vocabularyApi = { getDueReviews: () => get('/vocabulary/reviews/due'), getStats: () => get('/vocabulary/stats'), submitReview: (id, q) => post(`/vocabulary/reviews/${id}`, { quality: q }), getSaved: () => get('/vocabulary/saved') };
export const grammarApi = { getTopics: () => get('/grammar') };
export const writingApi = { getPrompts: () => get('/writing/prompts'), submit: (d) => post('/writing/submit', d), getSubmissions: () => get('/writing/submissions') };
export const speakingApi = { getPrompts: () => get('/speaking/prompts'), getSubmissions: () => get('/speaking/submissions') };
export const conversationsApi = { getAll: () => get('/conversations'), getBySlug: (slug) => get(`/conversations/${slug}`), getScenarios: () => get('/conversations/scenarios') };
export const mockExamApi = { getTemplates: () => get('/mock-exams/templates'), getHistory: () => get('/mock-exams/history') };
export const analyticsApi = { getLearnerAnalytics: () => get('/analytics/me') };
export const gamificationApi = { getBadges: () => get('/gamification/badges'), getLeaderboard: () => get('/gamification/leaderboard') };
export const notificationsApi = { getAll: () => get('/notifications') };
export const aiTutorApi = { createConversation: (mode) => post('/ai-tutor/conversations', { mode }), sendMessage: (id, msg) => post(`/ai-tutor/conversations/${id}/message`, { message: msg }) };
export const adminApi = { getDashboard: () => get('/admin/dashboard') };
