'use client';

import { useQuery } from '@tanstack/react-query';
import { pathwaysApi } from '@/services/api';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const levelColors = {
  A1: 'from-green-400 to-emerald-500', A2: 'from-blue-400 to-cyan-500',
  B1: 'from-violet-400 to-purple-500', B2: 'from-orange-400 to-amber-500',
  C1: 'from-red-400 to-rose-500', C2: 'from-slate-600 to-slate-800',
};
const levelDescs = {
  A1: 'Beginner basics: greetings, numbers, daily routines',
  A2: 'Elementary: shopping, travel, simple conversations',
  B1: 'Intermediate: opinions, workplace, exam readiness',
  B2: 'Upper intermediate: complex texts, formal writing',
  C1: 'Advanced: nuanced expression, academic German',
  C2: 'Mastery: near-native fluency and comprehension',
};

export default function LearnPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl mb-1">Learning Paths</h1>
        <p className="text-slate-500">Choose your CEFR level and start your structured learning journey.</p>
      </div>
      <div className="space-y-4">
        {['A1','A2','B1','B2','C1','C2'].map((level) => (
          <Link key={level} href={`/dashboard/learn/${level.toLowerCase()}`}
            className="group flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${levelColors[level]} flex items-center justify-center flex-shrink-0`}>
              <span className="font-display font-bold text-xl text-white">{level}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-lg">German {level} — Complete Course</h3>
              <p className="text-sm text-slate-500 mt-0.5">{levelDescs[level]}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500 transition" />
          </Link>
        ))}
      </div>
    </div>
  );
}
