'use client';
import { useState } from 'react';
import Link from 'next/link';
import { conversations } from '@/data/conversations';
import LevelFilter from '@/components/app/LevelFilter';
import PageHeader from '@/components/app/PageHeader';
import { Stethoscope, Home, Train, Briefcase, Building2, UtensilsCrossed, ShoppingCart, Landmark, Mail, Phone, Pill, MessageSquare } from 'lucide-react';

const iconMap = { doctor_visit:Stethoscope, apartment_search:Home, train_station:Train, job_interview:Briefcase, immigration_office:Building2, restaurant:UtensilsCrossed, supermarket:ShoppingCart, bank:Landmark, post_office:Mail, phone_call:Phone, pharmacy:Pill };
const colorMap = { doctor_visit:'from-red-400 to-rose-500', apartment_search:'from-blue-400 to-indigo-500', train_station:'from-green-400 to-emerald-500', job_interview:'from-violet-400 to-purple-500', immigration_office:'from-amber-400 to-orange-500', restaurant:'from-pink-400 to-rose-500', supermarket:'from-teal-400 to-cyan-500', bank:'from-yellow-400 to-amber-500', post_office:'from-sky-400 to-blue-500', phone_call:'from-emerald-400 to-green-500', pharmacy:'from-lime-400 to-green-500' };

export default function ConversationsPage() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? conversations : conversations.filter(c => c.level === filter);

  return (
    <div className="max-w-4xl space-y-5">
      <PageHeader title="Real-Life Conversations" subtitle={`${conversations.length} scenarios with video & dialogue`} />
      <LevelFilter levels={['all','A1','A2','B1','B2']} active={filter} onChange={setFilter} />
      <div className="grid sm:grid-cols-2 gap-3">
        {list.map(c => { const Icon = iconMap[c.scenario] || MessageSquare; return (
          <Link key={c.id} href={`/dashboard/conversations/${c.id}`} className="group flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 card-hover">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorMap[c.scenario]||'from-slate-400 to-slate-500'} flex items-center justify-center flex-shrink-0`}><Icon className="w-5 h-5 text-white" /></div>
            <div className="flex-1 min-w-0"><h3 className="font-semibold text-sm">{c.title}</h3><p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{c.description}</p>
              <div className="flex gap-2 mt-2"><span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{c.level}</span>{c.videoChannel && <span className="text-[10px] text-slate-400">{c.videoChannel}</span>}</div></div>
          </Link>);})}
      </div>
    </div>);
}
