'use client';
import { useState } from 'react';
import Link from 'next/link';
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link href="/login" className="text-brand-600 text-sm font-medium">← Back to login</Link>
        <h1 className="font-display font-bold text-3xl mt-4 mb-2">Reset Password</h1>
        {sent ? (
          <div className="mt-6 p-6 bg-green-50 rounded-2xl border border-green-200">
            <p className="text-green-800 font-medium">Check your email for a reset link.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500" />
            <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition">Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
}
