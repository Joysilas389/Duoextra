'use client';
import { useQuery } from '@tanstack/react-query';
import { conversationsApi } from '@/services/api';
import Link from 'next/link';
import { Stethoscope, Home, Train, Briefcase, Building2, MessageSquare } from 'lucide-react';

const icons = { doctor_visit: Stethoscope, apartment_search: Home, train_station: Train, job_interview: Briefcase, immigration_office: Building2 };
const colors = { doctor_visit:'from-red-400 to-rose-500', apartment_search:'from-blue-400 to-indigo-500', train_station:'from-green-400 to-emerald-500', job_interview:'from-violet-400 to-purple-500', immigration_office:'from-amber-400 to-orange-500' };

export default function ConversationsPage() {
  const { data } = useQuery({ queryKey: ['conversations'], queryFn: () => conversationsApi.getAll({}).then(r => r.data) });
  const convos = data?.items || [];
  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Real-Life Conversations</h1><p className="text-slate-500">Practice German for everyday situations.</p></div>
      <div className="grid md:grid-cols-2 gap-4">{convos.map(c => {
        const Icon = icons[c.scenario] || MessageSquare;
        return (<Link key={c.id} href={`/dashboard/conversations/${c.slug}`} className="group p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[c.scenario]||'from-slate-400 to-slate-500'} flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
            <div className="flex-1 min-w-0"><h3 className="font-display font-semibold mb-1">{c.title}</h3><p className="text-sm text-slate-500 line-clamp-2">{c.description}</p>
              <div className="flex gap-3 mt-3"><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{c.level}</span></div></div></div></Link>);})}</div>
    </div>);
}
