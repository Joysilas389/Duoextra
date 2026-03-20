'use client';

import { useQuery } from '@tanstack/react-query';
import { usersApi, vocabularyApi, gamificationApi } from '@/services/api';
import {
  Flame, Zap, Target, BookOpen, Brain, Clock, TrendingUp,
  ChevronRight, Calendar, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

function StatCard({ icon: Icon, label, value, color, subtext }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className={`font-display font-bold text-2xl ${color}`}>{value}</p>
          {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl bg-${color.replace('text-', '')}/10 flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ href, icon: Icon, label, desc, gradient }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 card-hover"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{label}</h3>
        <p className="text-xs text-slate-500 truncate">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition" />
    </Link>
  );
}

export default function DashboardPage() {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => usersApi.getDashboard().then((r) => r.data),
  });

  const { data: vocabStats } = useQuery({
    queryKey: ['vocabStats'],
    queryFn: () => vocabularyApi.getStats().then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const d = dashboard || {};
  const streak = d.streak || {};

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Greeting */}
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl mb-1">
          Guten Tag, {d.user?.profile?.displayName || 'Learner'} 👋
        </h1>
        <p className="text-slate-500">
          Keep up the great work! Here's your learning overview.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${streak.currentStreak || 0} days`}
          color="text-fire-500"
          subtext={`Best: ${streak.longestStreak || 0} days`}
        />
        <StatCard
          icon={Zap}
          label="Today's XP"
          value={d.todayXp || 0}
          color="text-brand-600"
          subtext={`Goal: ${d.user?.goals?.dailyGoalXp || 50} XP`}
        />
        <StatCard
          icon={Target}
          label="Total XP"
          value={(d.totalXp || 0).toLocaleString()}
          color="text-accent-600"
        />
        <StatCard
          icon={Brain}
          label="Vocab Due"
          value={d.vocabDueCount || 0}
          color="text-emerald-600"
          subtext="Words to review"
        />
      </div>

      {/* Today's XP Progress Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold">Daily Goal Progress</h2>
          <span className="text-sm text-slate-500">
            {d.todayXp || 0} / {d.user?.goals?.dailyGoalXp || 50} XP
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, ((d.todayXp || 0) / (d.user?.goals?.dailyGoalXp || 50)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Continue Learning</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <QuickAction
            href="/dashboard/learn"
            icon={BookOpen}
            label="Continue Lesson"
            desc="Pick up where you left off"
            gradient="from-brand-500 to-blue-400"
          />
          <QuickAction
            href="/dashboard/vocabulary"
            icon={Brain}
            label="Review Vocabulary"
            desc={`${d.vocabDueCount || 0} words due for review`}
            gradient="from-emerald-500 to-green-400"
          />
          <QuickAction
            href="/dashboard/conversations"
            icon={Target}
            label="Practice Speaking"
            desc="Real-life conversation scenarios"
            gradient="from-orange-500 to-amber-400"
          />
          <QuickAction
            href="/dashboard/mock-exams"
            icon={Calendar}
            label="Take Mock Exam"
            desc="Test your exam readiness"
            gradient="from-violet-500 to-purple-400"
          />
        </div>
      </div>

      {/* Weak Areas Alert */}
      {d.unresolvedMistakes > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-300 text-sm">
              You have {d.unresolvedMistakes} unresolved mistakes
            </p>
            <p className="text-amber-600 dark:text-amber-400 text-xs mt-0.5">
              Review them to strengthen your weak areas.
            </p>
            <Link
              href="/dashboard/review"
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 mt-2 hover:text-amber-900"
            >
              Review Mistakes <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {d.recentActivity?.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="font-display font-semibold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {d.recentActivity.slice(0, 5).map((activity, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
                <span className="text-slate-600 dark:text-slate-400 flex-1">
                  {activity.type.replace(/_/g, ' ')}
                </span>
                <span className="text-brand-600 font-medium">+{activity.xpEarned} XP</span>
                <span className="text-slate-400 text-xs">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
