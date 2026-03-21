'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function Flashcard({ front, sub, back, backSub, index, total, onNext, onPrev }) {
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped(!flipped);
  const next = () => { setFlipped(false); onNext(); };
  const prev = () => { setFlipped(false); onPrev(); };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-8 text-center cursor-pointer min-h-[200px] flex flex-col items-center justify-center select-none" onClick={flip}>
        {!flipped ? (<>
          <p className="font-display font-bold text-2xl sm:text-3xl mb-2">{front}</p>
          {sub && <span className="text-sm text-slate-400">{sub}</span>}
          <p className="text-sm text-slate-400 mt-6 flex items-center gap-1"><Eye className="w-4 h-4" />Tap to reveal</p>
        </>) : (<>
          <p className="font-display font-bold text-xl text-brand-600 mb-2">{back}</p>
          {backSub && <p className="text-sm text-slate-500 italic mt-2">"{backSub}"</p>}
        </>)}
      </div>
      <div className="flex border-t border-slate-200">
        <button onClick={prev} className="flex-1 py-3.5 flex items-center justify-center gap-1 text-sm font-medium text-slate-600 hover:bg-slate-50 active:bg-slate-100 transition"><ChevronLeft className="w-4 h-4" />Prev</button>
        <div className="w-px bg-slate-200" />
        <button onClick={next} className="flex-1 py-3.5 flex items-center justify-center gap-1 text-sm font-medium text-brand-600 hover:bg-brand-50 active:bg-brand-100 transition">Next<ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="text-center py-2 text-xs text-slate-400 bg-slate-50">{index + 1} / {total}</div>
    </div>
  );
}
