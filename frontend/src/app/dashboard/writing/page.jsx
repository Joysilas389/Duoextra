'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { writingApi } from '@/services/api';
import { Send, FileText, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WritingPage() {
  const [sel, setSel] = useState(null);
  const [text, setText] = useState('');
  const wc = text.trim().split(/\s+/).filter(Boolean).length;
  const { data: prompts } = useQuery({ queryKey: ['writing-prompts'], queryFn: () => writingApi.getPrompts({}).then(r => r.data) });
  const sub = useMutation({ mutationFn: (d) => writingApi.submit(d), onSuccess: () => { toast.success('Submitted! AI feedback coming soon.'); setSel(null); setText(''); } });

  if (sel) return (
    <div className="max-w-4xl space-y-6">
      <button onClick={()=>setSel(null)} className="text-sm text-brand-600 font-medium">← Back</button>
      <div className="bg-brand-50 dark:bg-brand-950/20 rounded-2xl p-6 border border-brand-200 dark:border-brand-800">
        <h2 className="font-display font-semibold text-lg mb-2">{sel.title}</h2>
        <p className="text-slate-700 dark:text-slate-300">{sel.promptText}</p>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">{sel.minWords&&<span>Min: {sel.minWords}</span>}{sel.maxWords&&<span>Max: {sel.maxWords}</span>}<span>{sel.level}</span></div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Schreiben Sie hier..." className="w-full p-6 min-h-[300px] resize-y bg-transparent outline-none text-base leading-relaxed" />
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <span className="text-sm text-slate-500">{wc} words</span>
          <button onClick={()=>sub.mutate({promptId:sel.id,text})} disabled={wc<(sel.minWords||10)||sub.isPending}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-50 transition"><Send className="w-4 h-4" />{sub.isPending?'Submitting...':'Submit'}</button>
        </div></div></div>);

  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Writing Practice</h1><p className="text-slate-500">Exam-style writing with AI feedback</p></div>
      <div className="space-y-3">{(prompts||[]).map(p=>(
        <button key={p.id} onClick={()=>setSel(p)} className="group w-full text-left flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center flex-shrink-0"><FileText className="w-6 h-6 text-violet-600" /></div>
          <div className="flex-1"><h3 className="font-semibold">{p.title}</h3><p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{p.promptText}</p>
            <div className="flex gap-3 mt-2"><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{p.level}</span><span className="text-xs text-slate-400 capitalize">{p.textType}</span></div></div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500" /></button>))}</div>
    </div>);
}
