'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { onboardingApi } from '@/services/api';
import toast from 'react-hot-toast';

const steps = ['purpose','provider','level','goal','complete'];
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ learningPurpose:'', examProvider:'', targetLevel:'', dailyGoalMinutes:15 });
  const update = (k,v) => setData({...data,[k]:v});
  const next = () => { if(step<steps.length-1) setStep(step+1); };
  const finish = async () => {
    try { await onboardingApi.saveQuestionnaire(data); toast.success('Study plan created!'); router.push('/dashboard'); }
    catch { toast.error('Failed to save'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-8"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center"><span className="text-white font-display font-bold text-sm">D</span></div><span className="font-display font-bold text-xl">DuoExtra</span></div>
        <div className="flex gap-1 mb-8">{steps.map((_,i)=>(<div key={i} className={`h-1 flex-1 rounded-full ${i<=step?'bg-brand-500':'bg-slate-200'}`} />))}</div>

        {step===0 && (<div><h2 className="font-display font-bold text-2xl mb-4">Why are you learning German?</h2>
          <div className="space-y-3">{['Exam preparation','Work','Study in Germany','Immigration','Travel','Personal interest'].map(p=>(
            <button key={p} onClick={()=>{update('learningPurpose',p);next();}} className={`w-full p-4 rounded-xl border text-left font-medium transition ${data.learningPurpose===p?'border-brand-500 bg-brand-50':'border-slate-200 hover:border-brand-300'}`}>{p}</button>))}</div></div>)}

        {step===1 && (<div><h2 className="font-display font-bold text-2xl mb-4">Which exam are you preparing for?</h2>
          <div className="space-y-3">{[{v:'goethe',l:'Goethe-Institut'},{v:'telc',l:'telc'},{v:'none',l:'No specific exam'}].map(p=>(
            <button key={p.v} onClick={()=>{update('examProvider',p.v);next();}} className={`w-full p-4 rounded-xl border text-left font-medium transition ${data.examProvider===p.v?'border-brand-500 bg-brand-50':'border-slate-200 hover:border-brand-300'}`}>{p.l}</button>))}</div></div>)}

        {step===2 && (<div><h2 className="font-display font-bold text-2xl mb-4">What level are you targeting?</h2>
          <div className="grid grid-cols-3 gap-3">{['A1','A2','B1','B2','C1','C2'].map(l=>(
            <button key={l} onClick={()=>{update('targetLevel',l);next();}} className={`p-4 rounded-xl border text-center font-display font-bold text-xl transition ${data.targetLevel===l?'border-brand-500 bg-brand-50 text-brand-700':'border-slate-200 hover:border-brand-300'}`}>{l}</button>))}</div></div>)}

        {step===3 && (<div><h2 className="font-display font-bold text-2xl mb-4">Daily study goal?</h2>
          <div className="space-y-3">{[{v:5,l:'5 min — Casual'},{v:10,l:'10 min — Regular'},{v:15,l:'15 min — Committed'},{v:30,l:'30 min — Intensive'}].map(g=>(
            <button key={g.v} onClick={()=>{update('dailyGoalMinutes',g.v);next();}} className={`w-full p-4 rounded-xl border text-left font-medium transition ${data.dailyGoalMinutes===g.v?'border-brand-500 bg-brand-50':'border-slate-200 hover:border-brand-300'}`}>{g.l}</button>))}</div></div>)}

        {step===4 && (<div className="text-center"><h2 className="font-display font-bold text-2xl mb-4">You\'re all set!</h2>
          <p className="text-slate-500 mb-8">Your personalized study plan is ready.</p>
          <button onClick={finish} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-lg hover:shadow-glow transition-all">Start Learning</button></div>)}
      </div>
    </div>);
}
