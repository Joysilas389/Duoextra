'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function GrammarDetailPage() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    fetch(`${API}/grammar/${slug}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null).then(d => setTopic(d)).catch(() => {});
  }, [slug]);

  if (!topic) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/dashboard/grammar" className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700"><ArrowLeft className="w-4 h-4" />Back to Grammar</Link>
      <div><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{topic.level}</span>
        <h1 className="font-display font-bold text-2xl mt-2">{topic.title}</h1></div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4"><BookOpen className="w-5 h-5 text-brand-600" /><h2 className="font-display font-semibold">Explanation</h2></div>
        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">{topic.explanation}</div>
      </div>
      {topic.examples && topic.examples.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-display font-semibold mb-4">Examples</h2>
          <div className="space-y-3">{(Array.isArray(topic.examples) ? topic.examples : []).map((ex, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-50 border text-sm">{typeof ex === 'string' ? ex : JSON.stringify(ex)}</div>))}</div>
        </div>)}
      {topic.tips && topic.tips.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-center gap-2 mb-3"><Lightbulb className="w-5 h-5 text-amber-600" /><h2 className="font-display font-semibold text-amber-800">Tips</h2></div>
          <ul className="space-y-2">{topic.tips.map((tip, i) => <li key={i} className="text-sm text-amber-700">• {tip}</li>)}</ul>
        </div>)}
    </div>);
}
