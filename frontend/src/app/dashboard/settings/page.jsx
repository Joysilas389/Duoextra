'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '@/lib/stores/auth-store';
import { Settings, Save, User, Globe, Clock, Target, LogOut } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function SettingsPage() {
  const logout = useAuthStore(s => s.logout);
  const [profile, setProfile] = useState({ displayName: '', timezone: 'Europe/Berlin', dailyGoalMinutes: 15, nativeLanguage: 'en' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    fetch(`${API}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.profile) setProfile({ displayName: d.profile.displayName || '', timezone: d.profile.timezone || 'Europe/Berlin', dailyGoalMinutes: d.profile.dailyGoalMinutes || 15, nativeLanguage: d.profile.nativeLanguage || 'en' }); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('duoextra_token');
      const res = await fetch(`${API}/users/profile`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(profile) });
      if (res.ok) toast.success('Settings saved!'); else toast.error('Failed to save');
    } catch { toast.error('Failed to save'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Settings</h1><p className="text-slate-500">Manage your profile and preferences</p></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div><label className="block text-sm font-medium mb-1.5">Display Name</label>
          <input value={profile.displayName} onChange={e => setProfile({...profile, displayName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500" /></div>
        <div><label className="block text-sm font-medium mb-1.5">Native Language</label>
          <select value={profile.nativeLanguage} onChange={e => setProfile({...profile, nativeLanguage: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none">
            <option value="en">English</option><option value="tr">Turkish</option><option value="ar">Arabic</option><option value="es">Spanish</option><option value="fr">French</option></select></div>
        <div><label className="block text-sm font-medium mb-1.5">Daily Goal</label>
          <select value={profile.dailyGoalMinutes} onChange={e => setProfile({...profile, dailyGoalMinutes: parseInt(e.target.value)})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none">
            <option value="5">5 min</option><option value="10">10 min</option><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option></select></div>
        <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-50 transition"><Save className="w-4 h-4" />{loading ? 'Saving...' : 'Save Settings'}</button>
      </div>
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <h2 className="font-display font-semibold text-red-600 mb-3">Danger Zone</h2>
        <button onClick={logout} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"><LogOut className="w-4 h-4" />Log Out</button>
      </div>
    </div>);
}
