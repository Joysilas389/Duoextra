'use client';
import { useState, useEffect } from 'react';
import { Bell, Flame, Brain, Trophy, Calendar } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const icons = { streak: Flame, review_due: Brain, achievement: Trophy, study_reminder: Calendar, exam_countdown: Calendar };

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    fetch(`${API}/notifications`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        if (Array.isArray(d) && d.length > 0) setNotifs(d);
        else setNotifs([
          { id: '1', type: 'streak', title: 'Keep your streak!', body: 'Practice today to maintain your streak.', isRead: false, createdAt: new Date().toISOString() },
          { id: '2', type: 'review_due', title: 'Vocabulary Review', body: 'You have words due for review.', isRead: false, createdAt: new Date().toISOString() },
        ]);
      }).catch(() => setNotifs([{ id: '1', type: 'streak', title: 'Welcome!', body: 'Start learning German today.', isRead: false, createdAt: new Date().toISOString() }]));
  }, []);

  const markRead = (id) => setNotifs(notifs.map(n => n.id === id ? { ...n, isRead: true } : n));

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="font-display font-bold text-2xl mb-1">Notifications</h1><p className="text-slate-500">{notifs.filter(n => !n.isRead).length} unread</p></div>
        <button onClick={() => setNotifs(notifs.map(n => ({ ...n, isRead: true })))} className="text-sm text-brand-600 font-medium">Mark all read</button></div>
      <div className="space-y-2">{notifs.map(n => {
        const Icon = icons[n.type] || Bell;
        return (<div key={n.id} onClick={() => markRead(n.id)} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition ${n.isRead ? 'bg-white border-slate-200 opacity-60' : 'bg-brand-50 border-brand-200'}`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${n.isRead ? 'bg-slate-100' : 'bg-brand-100'}`}><Icon className={`w-5 h-5 ${n.isRead ? 'text-slate-400' : 'text-brand-600'}`} /></div>
          <div className="flex-1"><h3 className="font-medium text-sm">{n.title}</h3><p className="text-xs text-slate-500 mt-0.5">{n.body}</p></div>
          {!n.isRead && <div className="w-2 h-2 rounded-full bg-brand-500 mt-2" />}</div>);
      })}</div>
    </div>);
}
