'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vocabularyApi } from '@/services/api';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VocabularyPage() {
  const qc = useQueryClient();
  const { data: dueReviews } = useQuery({ queryKey: ['vocab-due'], queryFn: () => vocabularyApi.getDueReviews().then(r => r.data) });
  const { data: stats } = useQuery({ queryKey: ['vocab-stats'], queryFn: () => vocabularyApi.getStats().then(r => r.data) });
  const [flipped, setFlipped] = useState(false);
  const reviewMut = useMutation({
    mutationFn: ({ vocabId, quality }) => vocabularyApi.submitReview(vocabId, quality),
    onSuccess: () => { qc.invalidateQueries(['vocab-due']); qc.invalidateQueries(['vocab-stats']); setFlipped(false); },
  });

  const current = dueReviews?.[0];
  const vocab = current?.vocab;

  return (
    <div className="max-w-4xl space-y-8">
      <div><h1 className="font-display font-bold text-2xl mb-1">Vocabulary Center</h1>
        <p className="text-slate-500">Master German words with spaced repetition</p></div>
      {stats && (
        <div className="grid grid-cols-4 gap-4">
          {[{l:'Total',v:stats.total,c:'text-slate-700'},{l:'Learning',v:stats.learning,c:'text-blue-600'},{l:'Reviewing',v:stats.reviewing,c:'text-amber-600'},{l:'Mastered',v:stats.mastered,c:'text-green-600'}].map(s=>(
            <div key={s.l} className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className={`font-display font-bold text-2xl ${s.c}`}>{s.v}</p><p className="text-xs text-slate-400 mt-1">{s.l}</p></div>))}
        </div>)}
      <div><h2 className="font-display font-semibold text-lg mb-4">Due for Review ({dueReviews?.length || 0})</h2>
        {vocab ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-8 text-center cursor-pointer min-h-[200px] flex flex-col items-center justify-center" onClick={() => setFlipped(!flipped)}>
              {!flipped ? (<><p className="font-display font-bold text-3xl mb-2">{vocab.word}</p>{vocab.gender && <span className="text-sm text-slate-400">({vocab.gender})</span>}<p className="text-sm text-slate-400 mt-4">Tap to reveal</p></>
              ) : (<><p className="font-display font-bold text-2xl text-brand-600 mb-2">{vocab.translation}</p>{vocab.exampleSentence && <p className="text-sm text-slate-500 italic mt-2">"{vocab.exampleSentence}"</p>}</>)}
            </div>
            {flipped && (
              <div className="flex border-t border-slate-200 dark:border-slate-700">
                {[{l:'Again',q:1,c:'text-red-600 hover:bg-red-50'},{l:'Hard',q:2,c:'text-orange-600 hover:bg-orange-50'},{l:'Good',q:3,c:'text-blue-600 hover:bg-blue-50'},{l:'Easy',q:5,c:'text-green-600 hover:bg-green-50'}].map(b=>(
                  <button key={b.q} onClick={() => { reviewMut.mutate({ vocabId: vocab.id, quality: b.q }); toast.success(b.q>=3?'Nice!':'We\'ll review again soon'); }}
                    className={`flex-1 py-3 text-sm font-semibold ${b.c} transition`}>{b.l}</button>))}
              </div>)}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" /><h3 className="font-display font-semibold text-lg mb-1">All caught up!</h3>
            <p className="text-slate-500 text-sm">No words due for review.</p></div>)}
      </div>
    </div>);
}
