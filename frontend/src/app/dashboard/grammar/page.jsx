'use client';
import { useQuery } from '@tanstack/react-query';
import { grammarApi } from '@/services/api';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function GrammarPage() {
  const { data: topics } = useQuery({ queryKey: ['grammar'], queryFn: () => grammarApi.getTopics().then(r => r.data) });
  const grouped = (topics || []).reduce((a, t) => { (a[t.category] = a[t.category] || []).push(t); return a; }, {});
  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Grammar Center</h1><p className="text-slate-500">Master German grammar from articles to Konjunktiv</p></div>
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}><h2 className="font-display font-semibold text-lg mb-3 capitalize">{cat.replace(/_/g,' ')}</h2>
          <div className="space-y-2">{items.map(t => (
            <Link key={t.id} href={`/dashboard/grammar/${t.slug}`} className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
              <div className="w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-950/30 flex items-center justify-center"><BookOpen className="w-5 h-5 text-pink-600" /></div>
              <div className="flex-1"><h3 className="font-medium text-sm">{t.title}</h3><span className="text-xs text-slate-400">{t.level}</span></div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500" /></Link>))}</div>
        </div>))}
    </div>);
}
