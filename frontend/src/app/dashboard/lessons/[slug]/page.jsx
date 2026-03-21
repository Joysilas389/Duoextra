'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Zap, Clock, Trophy } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function ExerciseRenderer({ exercise, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const content = exercise.content || {};
  const type = exercise.type;

  const handleSubmit = () => {
    const answer = type === 'FILL_BLANK' ? inputVal : selected;
    if (!answer) { toast.error('Please select an answer'); return; }
    setSubmitted(true);
    const correct = JSON.stringify(exercise.answerKey?.correct) === JSON.stringify(answer);
    setTimeout(() => onAnswer(answer, correct), 1500);
  };

  if (type === 'MCQ' || type === 'READING_MCQ' || type === 'LISTENING_MCQ') {
    const options = content.options || [];
    const correctAns = exercise.answerKey?.correct;
    return (
      <div className="space-y-4">
        <p className="font-medium text-lg">{exercise.prompt}</p>
        {exercise.instructions && <p className="text-sm text-slate-500">{exercise.instructions}</p>}
        {content.passage && <div className="bg-slate-50 p-4 rounded-xl text-sm leading-relaxed border">{content.passage}</div>}
        <div className="space-y-2">
          {options.map((opt, i) => {
            let cls = 'border-slate-200 hover:border-brand-300';
            if (submitted && opt === correctAns) cls = 'border-green-500 bg-green-50';
            else if (submitted && opt === selected && opt !== correctAns) cls = 'border-red-500 bg-red-50';
            else if (!submitted && opt === selected) cls = 'border-brand-500 bg-brand-50';
            return (<button key={i} onClick={() => !submitted && setSelected(opt)} className={`w-full p-4 rounded-xl border text-left font-medium transition ${cls}`}>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-sm font-bold mr-3">{String.fromCharCode(65 + i)}</span>{opt}
            </button>);
          })}
        </div>
        {!submitted && <button onClick={handleSubmit} className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition">Check Answer</button>}
        {submitted && exercise.explanation && <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm"><strong>Explanation:</strong> {exercise.explanation}</div>}
      </div>);
  }

  if (type === 'FILL_BLANK') {
    const correctAns = exercise.answerKey?.correct;
    let cls = '';
    if (submitted && inputVal.toLowerCase().trim() === String(correctAns).toLowerCase().trim()) cls = 'border-green-500 bg-green-50';
    else if (submitted) cls = 'border-red-500 bg-red-50';
    return (
      <div className="space-y-4">
        <p className="font-medium text-lg">{exercise.prompt}</p>
        <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Type your answer..." disabled={submitted}
          className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-brand-500 ${cls}`} />
        {submitted && inputVal.toLowerCase().trim() !== String(correctAns).toLowerCase().trim() && <p className="text-sm text-green-600">Correct answer: <strong>{correctAns}</strong></p>}
        {!submitted && <button onClick={handleSubmit} className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition">Check Answer</button>}
        {submitted && exercise.explanation && <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm"><strong>Explanation:</strong> {exercise.explanation}</div>}
      </div>);
  }

  // Fallback for other types
  return (
    <div className="space-y-4">
      <p className="font-medium text-lg">{exercise.prompt}</p>
      {exercise.instructions && <p className="text-sm text-slate-500">{exercise.instructions}</p>}
      <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Type your answer..." className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-brand-500" />
      <button onClick={() => { setSubmitted(true); onAnswer(inputVal, true); }} className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold">Submit</button>
    </div>);
}

export default function LessonPlayerPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    fetch(`${API}/lessons/${slug}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null).then(d => setLesson(d)).catch(() => {});
  }, [slug]);

  if (!lesson) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" /></div>;

  const steps = lesson.steps || [];
  const step = steps[currentStep];
  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  const handleAnswer = (answer, correct) => {
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(() => {
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
      else finishLesson();
    }, 500);
  };

  const finishLesson = async () => {
    setCompleted(true);
    const token = localStorage.getItem('duoextra_token');
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const accuracy = score.total > 0 ? score.correct / score.total : 1;
    try {
      await fetch(`${API}/lessons/${lesson.id}/complete`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ accuracy, timeSpent, xpEarned: lesson.xpReward || 15 }),
      });
    } catch {}
  };

  if (completed) {
    const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 100;
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"><Trophy className="w-10 h-10 text-green-600" /></div>
        <h1 className="font-display font-bold text-3xl mb-2">Lesson Complete!</h1>
        <p className="text-slate-500 mb-8">{lesson.title}</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-4"><p className="font-display font-bold text-2xl text-brand-600">+{lesson.xpReward || 15}</p><p className="text-xs text-slate-400">XP Earned</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="font-display font-bold text-2xl text-green-600">{accuracy}%</p><p className="text-xs text-slate-400">Accuracy</p></div>
          <div className="bg-white rounded-xl border p-4"><p className="font-display font-bold text-2xl">{score.correct}/{score.total}</p><p className="text-xs text-slate-400">Correct</p></div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => router.push('/dashboard')} className="px-6 py-3 rounded-xl border border-slate-200 font-semibold hover:bg-slate-50">Dashboard</button>
          <button onClick={() => router.push('/dashboard/learn')} className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700">Next Lesson</button>
        </div>
      </div>);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"><ArrowLeft className="w-4 h-4" />Exit</button>
        <span className="text-sm text-slate-500">{currentStep + 1} / {steps.length}</span>
        <div className="flex items-center gap-1"><Zap className="w-4 h-4 text-brand-500" /><span className="text-sm font-medium">{lesson.xpReward} XP</span></div>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full mb-8"><div className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      {step ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          {step.type === 'explanation' && (
            <div><h3 className="font-display font-semibold text-lg mb-3">{step.content?.title || 'Learn'}</h3>
              <div className="text-slate-600 leading-relaxed mb-6">{step.content?.text || step.content?.html || JSON.stringify(step.content)}</div>
              <button onClick={() => currentStep < steps.length - 1 ? setCurrentStep(currentStep + 1) : finishLesson()} className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold">Continue <ArrowRight className="w-4 h-4 inline ml-1" /></button></div>)}
          {step.type === 'exercise' && step.exercise && <ExerciseRenderer exercise={step.exercise} onAnswer={handleAnswer} />}
          {step.type !== 'explanation' && step.type !== 'exercise' && (
            <div><p className="text-slate-600 mb-4">{JSON.stringify(step.content)}</p>
              <button onClick={() => currentStep < steps.length - 1 ? setCurrentStep(currentStep + 1) : finishLesson()} className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold">Continue</button></div>)}
        </div>
      ) : <div className="text-center py-12 text-slate-500">No content for this step.</div>}
    </div>);
}
