'use client';
import { useQuery } from '@tanstack/react-query';
import { gamificationApi } from '@/services/api';
import { Trophy } from 'lucide-react';
export default function AchievementsPage() {
  const { data: badges } = useQuery({ queryKey: ['badges'], queryFn: () => gamificationApi.getBadges().then(r => r.data) });
  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Achievements</h1><p className="text-slate-500">Your earned badges and milestones</p></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{(badges||[]).map(ub=>(
        <div key={ub.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center card-hover">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="font-display font-semibold">{ub.badge.displayName}</h3>
          <p className="text-xs text-slate-500 mt-1">{ub.badge.description}</p>
          <p className="text-xs text-slate-400 mt-2">{new Date(ub.earnedAt).toLocaleDateString()}</p></div>))}</div>
    </div>);
}
