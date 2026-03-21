'use client';
import { useState } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

const mistakes = [
  { id: 1, category: 'grammar', question: 'Waehlen Sie: ___ Haus ist gross.', userAnswer: 'Der', correctAnswer: 'Das', explanation: 'Haus is neuter, so use "das".' },
  { id: 2, category: 'vocabulary', question: 'What does "die Bewerbung" mean?', userAnswer: 'complaint', correctAnswer: 'job application', explanation: 'Bewerbung = job application. Beschwerde = complaint.' },
  { id: 3, category: 'grammar', question: 'Ich ___ gestern ins Kino.', userAnswer: 'habe gegangen', correctAnswer: 'bin gegangen', explanation: 'gehen uses sein in Perfekt.' },
];

export default function ReviewPage() {
  const [resolved, setResolved] = useState(new Set());

  return (
    <div className="max-w-3xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Review Mistakes</h1><p className="text-slate-500">Learn from errors to improve faster</p></div>
      <div className="space-y-4">{mistakes.filter(m => !resolved.has(m.id)).map(m => (
        <div key={m.id} className="bg-white rounded-2xl border border-slate-200 p-5">
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium capitalize">{m.category}</span>
          <p className="font-medium mt-3 mb-3">{m.question}</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-lg bg-red-50 border border-red-200"><p className="text-xs text-red-500 mb-1">Your answer</p><p className="text-sm font-medium text-red-700">{m.userAnswer}</p></div>
            <div className="p-3 rounded-lg bg-green-50 border border-green-200"><p className="text-xs text-green-500 mb-1">Correct</p><p className="text-sm font-medium text-green-700">{m.correctAnswer}</p></div>
          </div>
          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mb-3">{m.explanation}</p>
          <button onClick={() => setResolved(new Set([...resolved, m.id]))} className="text-sm text-brand-600 font-medium hover:text-brand-700">Mark as understood</button>
        </div>))}
        {resolved.size === mistakes.length && <div className="text-center py-12 bg-white rounded-2xl border"><p className="font-display font-semibold text-lg text-green-600">All mistakes reviewed!</p></div>}
      </div>
    </div>);
}
