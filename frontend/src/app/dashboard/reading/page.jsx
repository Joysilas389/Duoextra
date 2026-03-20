'use client';
import { BookOpen } from 'lucide-react';
export default function ReadingPage() {
  return (<div className="max-w-4xl space-y-8">
    <div><h1 className="font-display font-bold text-2xl mb-1">Reading Practice</h1><p className="text-slate-500">Articles, emails, forms, and academic texts — matched to exam formats.</p></div>
    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      <BookOpen className="w-12 h-12 text-emerald-400 mx-auto mb-3" /><h3 className="font-display font-semibold text-lg">Reading tasks in Learning Paths</h3>
      <p className="text-slate-500 text-sm mt-1">Structured reading exercises by CEFR level with comprehension tasks.</p></div>
  </div>);
}
