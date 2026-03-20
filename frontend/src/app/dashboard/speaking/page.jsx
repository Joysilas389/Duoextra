'use client';
import { useQuery } from '@tanstack/react-query';
import { speakingApi } from '@/services/api';
import { Mic, ChevronRight } from 'lucide-react';

export default function SpeakingPage() {
  const { data: prompts } = useQuery({ queryKey: ['speaking-prompts'], queryFn: () => speakingApi.getPrompts({}).then(r => r.data) });
  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Speaking Practice</h1><p className="text-slate-500">Record your voice, get AI feedback on pronunciation and fluency.</p></div>
      <div className="space-y-3">{(prompts||[]).map(p=>(
        <div key={p.id} className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center"><Mic className="w-6 h-6 text-white" /></div>
          <div className="flex-1"><h3 className="font-semibold">{p.title}</h3><p className="text-sm text-slate-500 line-clamp-1">{p.promptText}</p>
            <div className="flex gap-3 mt-2"><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{p.level}</span><span className="text-xs text-slate-400 capitalize">{p.taskType?.replace(/_/g,' ')}</span></div></div>
          <button className="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition">Start</button>
        </div>))}</div>
    </div>);
}
