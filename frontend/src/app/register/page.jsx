'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/stores/auth-store';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      await register(form.email, form.password, form.displayName);
      toast.success('Account created!');
      router.push('/onboarding');
    } catch (err) { toast.error(err.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center"><span className="text-white font-display font-bold">D</span></div><span className="font-display font-bold text-2xl">DuoExtra</span></Link>
          <h1 className="font-display font-bold text-3xl mb-2">Create your account</h1>
          <p className="text-slate-500">Start mastering German in minutes</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-sm font-medium mb-1.5">Display Name</label>
              <input type="text" value={form.displayName} onChange={update('displayName')} placeholder="How should we call you?" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500 outline-none transition" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={update('email')} required placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500 outline-none transition" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Password</label>
              <input type="password" value={form.password} onChange={update('password')} required placeholder="Min. 8 characters" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-500 outline-none transition" /></div>
            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold hover:shadow-glow disabled:opacity-60 transition-all">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus className="w-5 h-5" /> Create Account</>}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <Link href="/login" className="text-brand-600 font-semibold">Sign in</Link></p>
      </div>
    </div>
  );
}
