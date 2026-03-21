'use client';
import { useState } from 'react';
import { allLevels, totalWordCount } from '@/data/vocabulary';
import { phrases, totalPhraseCount, phraseCategories } from '@/data/phrases';
import Flashcard from '@/components/app/Flashcard';
import LevelFilter from '@/components/app/LevelFilter';
import PageHeader from '@/components/app/PageHeader';
import { BookOpen, MessageCircle } from 'lucide-react';

export default function VocabularyPage() {
  const [mode, setMode] = useState('words');
  const [level, setLevel] = useState('A1');
  const [index, setIndex] = useState(0);
  const [phraseCat, setPhraseCat] = useState('all');

  const words = allLevels[level]?.words || [];
  const filteredPhrases = phraseCat === 'all' ? phrases : phrases.filter(p => phraseCat === 'idiom' ? p.category === 'idiom' : p.level === phraseCat);
  const items = mode === 'words' ? words : filteredPhrases;
  const item = items[index] || null;

  const next = () => setIndex((index + 1) % items.length);
  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const reset = (m, lvl) => { if (m) setMode(m); if (lvl) setLevel(lvl); setIndex(0); };

  const lvlCounts = { A1: allLevels.A1.count, A2: allLevels.A2.count, B1: allLevels.B1.count, B2: allLevels.B2.count };

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <PageHeader title="Vocabulary & Phrases" subtitle={`${totalWordCount} words + ${totalPhraseCount} phrases`} />

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => reset('words')} className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${mode === 'words' ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200'}`}>
          <BookOpen className="w-4 h-4" />Words</button>
        <button onClick={() => reset('phrases')} className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${mode === 'phrases' ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200'}`}>
          <MessageCircle className="w-4 h-4" />Phrases</button>
      </div>

      {mode === 'words' && <LevelFilter levels={['A1','A2','B1','B2']} active={level} onChange={l => { setLevel(l); setIndex(0); }} counts={lvlCounts} />}
      {mode === 'phrases' && <LevelFilter levels={['all','A1','A2','B1','B2','idiom']} active={phraseCat} onChange={c => { setPhraseCat(c); setIndex(0); }} />}

      {item && mode === 'words' && (
        <Flashcard front={item.word} sub={item.genderLabel} back={item.translation} backSub={item.example} index={index} total={items.length} onNext={next} onPrev={prev} />
      )}
      {item && mode === 'phrases' && (
        <Flashcard front={item.de} sub={`${item.level} ${item.category === 'idiom' ? '• Idiom' : ''}`} back={item.en} index={index} total={items.length} onNext={next} onPrev={prev} />
      )}
    </div>
  );
}
