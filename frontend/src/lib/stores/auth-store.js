
import { create } from 'zustand';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const useAuthStore = create((set) => ({
  user: null, isAuthenticated: false, isLoading: true,
  initialize: async () => {
    if (typeof window === 'undefined') { set({ isLoading: false }); return; }
    const token = localStorage.getItem('duoextra_token');
    try {
      const res = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      set({ user: data, isAuthenticated: true, isLoading: false });
    } catch { localStorage.removeItem('duoextra_token'); set({ user: null, isAuthenticated: false, isLoading: false }); }
  },
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    localStorage.setItem('duoextra_token', data.accessToken);
    set({ user: data.user, isAuthenticated: true });
  },
  register: async (email, password, displayName) => {
    const res = await fetch(`${API_URL}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, displayName }) });
    const data = await res.json();
    localStorage.setItem('duoextra_token', data.accessToken);
    set({ user: data.user, isAuthenticated: true });
  },
  logout: () => { localStorage.removeItem('duoextra_token'); set({ user: null, isAuthenticated: false }); if (typeof window !== 'undefined') window.location.href = '/'; },
}));
export default useAuthStore;
