'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Simple auth store using module-level state + callbacks
let state = { user: null, isAuthenticated: false, isLoading: true };
let listeners = [];

function notify() { listeners.forEach(fn => fn({ ...state })); }
export function subscribe(fn) { listeners.push(fn); return () => { listeners = listeners.filter(l => l !== fn); }; }
export function getState() { return { ...state }; }

export async function initialize() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('duoextra_token') : null;
  if (!token) { state = { user: null, isAuthenticated: false, isLoading: false }; notify(); return; }
  try {
    const res = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const user = await res.json();
      state = { user, isAuthenticated: true, isLoading: false };
    } else {
      localStorage.removeItem('duoextra_token');
      state = { user: null, isAuthenticated: false, isLoading: false };
    }
  } catch {
    state = { user: null, isAuthenticated: false, isLoading: false };
  }
  notify();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Login failed'); }
  const data = await res.json();
  localStorage.setItem('duoextra_token', data.accessToken);
  localStorage.setItem('duoextra_refresh', data.refreshToken);
  state = { user: data.user, isAuthenticated: true, isLoading: false };
  notify();
  return data;
}

export async function register(email, password, displayName) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  });
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.message || 'Registration failed'); }
  const data = await res.json();
  localStorage.setItem('duoextra_token', data.accessToken);
  localStorage.setItem('duoextra_refresh', data.refreshToken);
  state = { user: data.user, isAuthenticated: true, isLoading: false };
  notify();
  return data;
}

export function logout() {
  localStorage.removeItem('duoextra_token');
  localStorage.removeItem('duoextra_refresh');
  state = { user: null, isAuthenticated: false, isLoading: false };
  notify();
}
