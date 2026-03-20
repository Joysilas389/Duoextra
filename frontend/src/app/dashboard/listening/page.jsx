'use client';
import { Headphones } from 'lucide-react';
export default function ListeningPage() {
  return (<div className="max-w-4xl space-y-8">
    <div><h1 className="font-display font-bold text-2xl mb-1">Listening Practice</h1><p className="text-slate-500">Train your ear with exam-style audio tasks and native recordings.</p></div>
    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      <Headphones className="w-12 h-12 text-blue-400 mx-auto mb-3" /><h3 className="font-display font-semibold text-lg">Listening exercises available in Learning Paths</h3>
      <p className="text-slate-500 text-sm mt-1">Navigate to your current level to practice exam-style listening tasks.</p></div>
  </div>);
}
