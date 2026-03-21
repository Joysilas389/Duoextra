'use client';
import Link from 'next/link';
import { conversations } from '@/data/conversations';
import PageHeader from '@/components/app/PageHeader';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function ReadingPage() {
  return (
    <div className="max-w-3xl space-y-5">
      <PageHeader title="Reading Practice" subtitle="Read real German dialogues" />
      <div className="space-y-2">{conversations.map(c => (
        <Link key={c.id} href={`/dashboard/conversations/${c.id}`} className="group flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 card-hover">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center"><BookOpen className="w-4 h-4 text-emerald-600" /></div>
          <div className="flex-1"><h3 className="font-medium text-sm">{c.title}</h3>
            <div className="flex gap-2 mt-1"><span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{c.level}</span><span className="text-[10px] text-slate-400">{c.description}</span></div></div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500" /></Link>))}</div>
    </div>);
}
