'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Headphones, PenTool, Mic, Brain, Trophy,
  Target, BarChart3, ChevronRight, Sparkles, Globe, Shield
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

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
  { value: '∞', label: 'Practice' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">D</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Duo<span className="gradient-text">Extra</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">Pricing</Link>
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition">Log in</Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold hover:shadow-glow transition-all"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Goethe & telc Exam Preparation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-5xl md:text-7xl tracking-tight leading-[1.08] mb-6"
          >
            Master German.
            <br />
            <span className="gradient-text">Pass your exam.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The complete German learning platform. Prepare for Goethe and telc exams
            from A1 to C2 with AI feedback, mock exams, real-life conversations,
            and adaptive study plans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-lg hover:shadow-glow hover:scale-[1.02] transition-all"
            >
              Start Learning — Free
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-lg hover:border-brand-300 transition-all"
            >
              Explore Features
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-12 mt-16"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-3xl text-brand-600">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Everything you need to <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Train all four exam skills plus grammar, vocabulary, pronunciation, and real-life German communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{skill.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Providers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Built for <span className="gradient-text">real exams</span>
              </h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Not just generic German practice. DuoExtra is structured around actual Goethe-Institut
                and telc exam formats — with the right task types, timing rules, and scoring rubrics.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Target, text: 'Mock exams matching official format' },
                  { icon: BarChart3, text: 'Section-by-section score breakdown' },
                  { icon: Trophy, text: 'Exam readiness prediction' },
                  { icon: Shield, text: 'Rubric-based AI writing evaluation' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-brand-600" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-500/10 to-accent-500/10 rounded-3xl p-8 border border-brand-200/30">
                <div className="grid grid-cols-2 gap-4">
                  {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                    <div key={lvl} className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700 card-hover">
                      <div className="font-display font-bold text-2xl text-brand-600">{lvl}</div>
                      <div className="text-xs text-slate-400 mt-1">CEFR Level</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-600 to-accent-600 rounded-3xl p-12 md:p-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Start your German journey today
            </h2>
            <p className="text-brand-100 text-lg mb-8 max-w-lg mx-auto">
              Take the free placement test, get your personalized study plan,
              and begin preparing for your exam.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-brand-700 font-semibold text-lg hover:bg-brand-50 transition-all"
            >
              Create Free Account
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">D</span>
            </div>
            <span className="font-display font-semibold">DuoExtra</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="/features" className="hover:text-brand-600 transition">Features</Link>
            <Link href="/pricing" className="hover:text-brand-600 transition">Pricing</Link>
            <Link href="/privacy" className="hover:text-brand-600 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-600 transition">Terms</Link>
          </div>
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} DuoExtra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
