'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/lib/stores/auth-store';
import {
  LayoutDashboard, BookOpen, Headphones, BookMarked, PenTool, Mic,
  Brain, Languages, AudioWaveform, Target, BarChart3, Trophy,
  MessageCircle, Bell, Settings, LogOut, ChevronLeft, Menu, Flame,
  GraduationCap, MessageSquare
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/learn', icon: BookOpen, label: 'Learning Paths' },
  { href: '/dashboard/listening', icon: Headphones, label: 'Listening' },
  { href: '/dashboard/reading', icon: BookMarked, label: 'Reading' },
  { href: '/dashboard/writing', icon: PenTool, label: 'Writing' },
  { href: '/dashboard/speaking', icon: Mic, label: 'Speaking' },
  { href: '/dashboard/conversations', icon: MessageSquare, label: 'Conversations' },
  { href: '/dashboard/grammar', icon: Brain, label: 'Grammar' },
  { href: '/dashboard/vocabulary', icon: Languages, label: 'Vocabulary' },
  { href: '/dashboard/pronunciation', icon: AudioWaveform, label: 'Pronunciation' },
  { href: '/dashboard/mock-exams', icon: GraduationCap, label: 'Mock Exams' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/achievements', icon: Trophy, label: 'Achievements' },
  { href: '/dashboard/ai-tutor', icon: MessageCircle, label: 'AI Tutor' },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, initialize, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-display font-bold">D</span>
          </div>
          <div className="w-6 h-6 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-[72px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-700">
          {sidebarOpen && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-display font-bold text-xs">D</span>
              </div>
              <span className="font-display font-bold text-lg">DuoExtra</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hidden lg:block"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
                title={item.label}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-brand-600' : ''}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-700 space-y-1">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span>Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 w-full"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-6 ml-auto">
            {/* Streak */}
            <div className="flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-fire-500 fire-glow" />
              <span className="font-display font-bold text-fire-600">5</span>
            </div>

            {/* Notifications */}
            <Link href="/dashboard/notifications" className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Link>

            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
