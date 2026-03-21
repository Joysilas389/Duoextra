'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, Lock, CheckCircle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function LevelDetailPage() {
  const { level } = useParams();
  const [pathways, setPathways] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    fetch(`${API}/pathways`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : []).then(d => {
        const match = (Array.isArray(d) ? d : []).filter(p => p.slug?.includes(level));
        setPathways(match);
      }).catch(() => {});
  }, [level]);

  const pathway = pathways[0];

  return (
    <div className="max-w-4xl space-y-6">
      <Link href="/dashboard/learn" className="flex items-center gap-1 text-sm text-brand-600"><ArrowLeft className="w-4 h-4" />Back to Levels</Link>
      <h1 className="font-display font-bold text-2xl">German {level?.toUpperCase()} — Complete Course</h1>

      {pathway?.units?.length > 0 ? pathway.units.map((unit, ui) => (
        <div key={unit.id} className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-display font-semibold text-lg mb-3">{unit.title}</h2>
          <div className="space-y-2">
            {(unit.lessons || []).map((lesson, li) => (
              <Link key={lesson.id} href={`/dashboard/lessons/${lesson.slug}`}
                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-brand-600" /></div>
                <div className="flex-1"><h3 className="font-medium text-sm">{lesson.title}</h3>
                  <div className="flex gap-2 mt-0.5"><span className="text-xs text-slate-400">{lesson.estimatedMinutes || 10} min</span><span className="text-xs text-slate-400">+{lesson.xpReward || 15} XP</span></div></div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500" />
              </Link>))}
          </div>
        </div>
      )) : <div className="text-center py-12 bg-white rounded-2xl border"><p className="text-slate-500">Loading lessons...</p></div>}
    </div>);
}
