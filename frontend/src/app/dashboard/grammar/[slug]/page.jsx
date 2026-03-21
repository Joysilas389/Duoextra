'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { grammarTopics } from '@/data/grammar';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function GrammarDetail() {
  const { slug } = useParams();
  const topic = grammarTopics.find(t => t.slug === slug);
  if (!topic) return <div className="text-center py-16"><p className="font-semibold">Not found</p><Link href="/dashboard/grammar" className="text-brand-600 text-sm">Back</Link></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Link href="/dashboard/grammar" className="flex items-center gap-1 text-sm text-brand-600"><ArrowLeft className="w-4 h-4" />Back</Link>
      <div><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{topic.level}</span>
        <h1 className="font-display font-bold text-xl mt-2">{topic.title}</h1></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="font-display font-semibold text-sm mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-brand-600" />Explanation</h2>
        <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{topic.explanation}</div>
      </div>
      {topic.examples?.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-display font-semibold text-sm mb-3">Examples</h2>
          <div className="space-y-2">{topic.examples.map((ex,i) => (
            <div key={i} className="p-3 rounded-lg bg-green-50 border border-green-100 text-sm font-medium text-green-800">{ex}</div>))}</div>
        </div>)}
    </div>);
}
