'use client';
import Link from 'next/link';
import { BookOpen, Headphones, PenTool, Mic, Brain, Trophy, Target, BarChart3, ChevronRight, Sparkles, Globe, Shield } from 'lucide-react';

const skills = [
  { icon: Headphones, title: 'Listening', desc: 'Native audio, exam-style tasks, accent training', color: 'from-blue-500 to-cyan-400' },
  { icon: BookOpen, title: 'Reading', desc: 'Articles, emails, forms — real exam text types', color: 'from-emerald-500 to-green-400' },
  { icon: PenTool, title: 'Writing', desc: 'AI-graded emails, essays, complaints with rubric feedback', color: 'from-violet-500 to-purple-400' },
  { icon: Mic, title: 'Speaking', desc: 'Record, get AI pronunciation & fluency feedback', color: 'from-orange-500 to-amber-400' },
  { icon: Brain, title: 'Grammar', desc: 'Cases, verbs, Konjunktiv — explained & drilled', color: 'from-pink-500 to-rose-400' },
  { icon: Globe, title: 'Real-Life German', desc: '200+ scenarios: doctor, bank, office, job interview', color: 'from-indigo-500 to-blue-400' },
];

const stats = [
  { value: '6', label: 'CEFR Levels' },
  { value: '2', label: 'Exam Providers' },
  { value: '200+', label: 'Conversations' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center"><span className="text-white font-display font-bold text-sm">D</span></div>
            <span className="font-display font-bold text-xl tracking-tight">Duo<span className="gradient-text">Extra</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">Pricing</Link>
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">Log in</Link>
            <Link href="/register" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold hover:shadow-glow transition-all">Start Free</Link>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-600">Log in</Link>
            <Link href="/register" className="px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold">Start Free</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" /> Goethe & telc Exam Preparation
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight leading-[1.08] mb-6">Master German.<br /><span className="gradient-text">Pass your exam.</span></h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">The complete German learning platform. Prepare for Goethe and telc exams from A1 to C2 with AI feedback, mock exams, real-life conversations, and adaptive study plans.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-lg hover:shadow-glow hover:scale-[1.02] transition-all">Start Learning — Free <ChevronRight className="w-5 h-5" /></Link>
            <Link href="/features" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold text-lg hover:border-brand-300 transition-all">Explore Features</Link>
          </div>
          <div className="flex justify-center gap-12 mt-16">
            {stats.map((s) => (<div key={s.label} className="text-center"><div className="font-display font-bold text-3xl text-brand-600">{s.value}</div><div className="text-xs uppercase tracking-wider text-slate-400 mt-1">{s.label}</div></div>))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Everything you need to <span className="gradient-text">succeed</span></h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.title} className="group p-6 rounded-2xl bg-white border border-slate-200 card-hover">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}><skill.icon className="w-6 h-6 text-white" /></div>
                <h3 className="font-display font-semibold text-xl mb-2">{skill.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{skill.desc}</p>
              </div>))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-600 to-accent-600 rounded-3xl p-12 md:p-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">Start your German journey today</h2>
            <p className="text-brand-100 text-lg mb-8 max-w-lg mx-auto">Take the free placement test, get your personalized study plan, and begin preparing for your exam.</p>
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-700 font-semibold text-lg hover:bg-brand-50 transition-all">Create Free Account <ChevronRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center"><span className="text-white font-display font-bold text-xs">D</span></div><span className="font-display font-semibold">DuoExtra</span></div>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="/features" className="hover:text-brand-600 transition">Features</Link>
            <Link href="/pricing" className="hover:text-brand-600 transition">Pricing</Link>
          </div>
          <div className="text-sm text-slate-400">&copy; 2026 DuoExtra. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
