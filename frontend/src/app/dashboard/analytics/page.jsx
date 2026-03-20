'use client';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/services/api';
import { TrendingUp, Clock, Brain } from 'lucide-react';
export default function AnalyticsPage() {
  const { data: a } = useQuery({ queryKey: ['analytics'], queryFn: () => analyticsApi.getLearnerAnalytics().then(r => r.data) });
  const d = a || {};
  return (
    <div className="max-w-5xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Analytics</h1><p className="text-slate-500">Track your progress across all skills</p></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 text-slate-500 text-sm mb-2"><TrendingUp className="w-4 h-4" />Total XP</div><p className="font-display font-bold text-3xl text-brand-600">{(d.totalXp||0).toLocaleString()}</p></div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 text-slate-500 text-sm mb-2"><Clock className="w-4 h-4" />Time</div><p className="font-display font-bold text-3xl">{d.totalMinutes||0} min</p></div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2 text-slate-500 text-sm mb-2"><Brain className="w-4 h-4" />Vocab</div><p className="font-display font-bold text-3xl text-green-600">{d.vocabStats?.mastered||0}</p></div>
      </div>
    </div>);
}
