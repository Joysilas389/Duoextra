'use client';
import { useQuery } from '@tanstack/react-query';
import { mockExamApi } from '@/services/api';
import { GraduationCap, Clock, PlayCircle, Target } from 'lucide-react';
export default function MockExamsPage() {
  const { data: templates } = useQuery({ queryKey: ['mock-templates'], queryFn: () => mockExamApi.getTemplates({}).then(r => r.data) });
  const { data: history } = useQuery({ queryKey: ['mock-history'], queryFn: () => mockExamApi.getHistory().then(r => r.data) });
  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Mock Exams</h1><p className="text-slate-500">Simulate real exam conditions with timed tests.</p></div>
      <div className="grid md:grid-cols-2 gap-4">{(templates||[]).map(t=>(
        <div key={t.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center"><GraduationCap className="w-6 h-6 text-white" /></div>
            <div><h3 className="font-display font-semibold">{t.name}</h3><p className="text-sm text-slate-500">{t.examDefinition?.name}</p></div></div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition"><PlayCircle className="w-4 h-4" /> Start</button>
        </div>))}</div>
    </div>);
}
