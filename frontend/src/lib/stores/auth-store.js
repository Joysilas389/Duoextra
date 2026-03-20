import { create } from 'zustand';
import { authApi } from '@/services/api';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: async () => {
    const token = localStorage.getItem('duoextra_token');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const { data } = await authApi.me();
      set({ user: data, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('duoextra_token');
      localStorage.removeItem('duoextra_refresh');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    const { data } = await authApi.login({ email, password });
    localStorage.setItem('duoextra_token', data.accessToken);
    localStorage.setItem('duoextra_refresh', data.refreshToken);
    set({ user: data.user, isAuthenticated: true });
    return data;
  },

  register: async (email, password, displayName) => {
    const { data } = await authApi.register({ email, password, displayName });
    localStorage.setItem('duoextra_token', data.accessToken);
    localStorage.setItem('duoextra_refresh', data.refreshToken);
    set({ user: data.user, isAuthenticated: true });
    return data;
  },

  logout: async () => {
    const refresh = localStorage.getItem('duoextra_refresh');
    try { if (refresh) await authApi.logout(refresh); } catch {}
    localStorage.removeItem('duoextra_token');
    localStorage.removeItem('duoextra_refresh');
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
