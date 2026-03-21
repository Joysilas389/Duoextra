'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Zap, Target, BookOpen, Brain, ChevronRight, Calendar, AlertTriangle, MessageSquare, GraduationCap } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function StatCard({ icon: Icon, label, value, color, subtext }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 card-hover">
      <div className="flex items-start justify-between"><div><p className="text-sm text-slate-500 mb-1">{label}</p><p className={`font-display font-bold text-2xl ${color}`}>{value}</p>{subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}</div>
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"><Icon className={`w-5 h-5 ${color}`} /></div></div>
    </div>);
}

function QuickAction({ href, icon: Icon, label, desc, gradient }) {
  return (
    <Link href={href} className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 card-hover">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
      <div className="flex-1 min-w-0"><h3 className="font-semibold text-sm">{label}</h3><p className="text-xs text-slate-500 truncate">{desc}</p></div>
      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition" />
    </Link>);
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    if (!token) { setLoading(false); return; }
    fetch(`${API}/users/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="space-y-6 animate-pulse"><div className="h-8 bg-slate-200 rounded w-48" /><div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_,i) => <div key={i} className="h-28 bg-slate-200 rounded-2xl" />)}</div></div>;

  const streak = data?.streak || {};
  const user = data?.user || {};
  const name = user?.profile?.displayName || user?.email?.split('@')[0] || 'Learner';

  return (
    <div className="space-y-8 max-w-6xl">
      <div><h1 className="font-display font-bold text-2xl md:text-3xl mb-1">Guten Tag, {name} 👋</h1><p className="text-slate-500">Keep up the great work! Here's your learning overview.</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Streak" value={`${streak.currentStreak || 0} days`} color="text-orange-500" subtext={`Best: ${streak.longestStreak || 0} days`} />
        <StatCard icon={Zap} label="Today's XP" value={data?.todayXp || 0} color="text-brand-600" subtext="Keep going!" />
        <StatCard icon={Target} label="Total XP" value={(data?.totalXp || 0).toLocaleString()} color="text-purple-600" />
        <StatCard icon={Brain} label="Vocab Due" value={data?.vocabDueCount || 0} color="text-emerald-600" subtext="Words to review" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-3"><h2 className="font-display font-semibold">Daily Goal Progress</h2><span className="text-sm text-slate-500">{data?.todayXp || 0} / 50 XP</span></div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, ((data?.todayXp || 0) / 50) * 100)}%` }} /></div>
      </div>
      <div><h2 className="font-display font-semibold text-lg mb-4">Continue Learning</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <QuickAction href="/dashboard/learn" icon={BookOpen} label="Continue Lesson" desc="Pick up where you left off" gradient="from-brand-500 to-blue-400" />
          <QuickAction href="/dashboard/vocabulary" icon={Brain} label="Review Vocabulary" desc={`${data?.vocabDueCount || 0} words due`} gradient="from-emerald-500 to-green-400" />
          <QuickAction href="/dashboard/conversations" icon={MessageSquare} label="Practice Speaking" desc="Real-life scenarios" gradient="from-orange-500 to-amber-400" />
          <QuickAction href="/dashboard/mock-exams" icon={GraduationCap} label="Take Mock Exam" desc="Test your readiness" gradient="from-violet-500 to-purple-400" />
        </div>
      </div>
    </div>);
}
