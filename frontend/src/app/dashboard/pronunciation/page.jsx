'use client';
import { AudioWaveform } from 'lucide-react';
export default function PronunciationPage() {
  return (<div className="max-w-4xl space-y-8">
    <div><h1 className="font-display font-bold text-2xl mb-1">Pronunciation Center</h1><p className="text-slate-500">Phoneme practice, minimal pairs, stress and intonation drills.</p></div>
    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      <AudioWaveform className="w-12 h-12 text-indigo-400 mx-auto mb-3" /><h3 className="font-display font-semibold text-lg">Pronunciation drills coming soon</h3>
      <p className="text-slate-500 text-sm mt-1">Phoneme practice, minimal pairs, and read-aloud comparison.</p></div>
  </div>);
}
