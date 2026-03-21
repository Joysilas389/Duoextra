'use client';
import { useState } from 'react';
import Link from 'next/link';
import { grammarTopics, grammarCategories } from '@/data/grammar';
import LevelFilter from '@/components/app/LevelFilter';
import PageHeader from '@/components/app/PageHeader';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function GrammarPage() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? grammarTopics : grammarTopics.filter(t => t.level === filter);
  const grouped = list.reduce((a, t) => { (a[t.category] = a[t.category] || []).push(t); return a; }, {});

  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader title="Grammar Center" subtitle={`${grammarTopics.length} topics from A1 to B2`} />
      <LevelFilter levels={['all','A1','A2','B1','B2']} active={filter} onChange={setFilter} />
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}><h2 className="font-display font-semibold text-base mb-2">{grammarCategories[cat] || cat}</h2>
          <div className="space-y-2">{items.map(t => (
            <Link key={t.slug} href={`/dashboard/grammar/${t.slug}`} className="group flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 card-hover">
              <div className="w-9 h-9 rounded-lg bg-pink-50 flex items-center justify-center"><BookOpen className="w-4 h-4 text-pink-600" /></div>
              <div className="flex-1"><h3 className="font-medium text-sm">{t.title}</h3><span className="text-[10px] text-slate-400">{t.level}</span></div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500" /></Link>))}</div></div>))}
    </div>);
}
