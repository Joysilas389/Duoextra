'use client';
import Link from 'next/link';
export default function PricingPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto pt-24">
      <Link href="/" className="text-brand-600 text-sm font-medium">← Back to home</Link>
      <h1 className="font-display font-bold text-4xl mt-4 mb-6 text-center">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center">
          <h3 className="font-display font-bold text-2xl mb-2">Free</h3>
          <p className="text-4xl font-bold text-brand-600 mb-4">€0</p>
          <ul className="text-slate-600 space-y-2 text-sm mb-6">
            <li>✓ Basic lessons (A1-A2)</li>
            <li>✓ Grammar center</li>
            <li>✓ 5 vocabulary reviews/day</li>
            <li>✓ 3 conversations</li>
          </ul>
          <Link href="/register" className="block w-full py-3 rounded-xl border-2 border-brand-500 text-brand-600 font-semibold hover:bg-brand-50 transition">Get Started</Link>
        </div>
        <div className="p-8 bg-gradient-to-br from-brand-600 to-accent-600 rounded-2xl text-white text-center">
          <h3 className="font-display font-bold text-2xl mb-2">Premium</h3>
          <p className="text-4xl font-bold mb-4">€9.99<span className="text-lg font-normal">/mo</span></p>
          <ul className="space-y-2 text-sm mb-6 text-brand-100">
            <li>✓ All CEFR levels (A1-C2)</li>
            <li>✓ Unlimited vocabulary SRS</li>
            <li>✓ All 200+ conversations</li>
            <li>✓ AI writing feedback</li>
            <li>✓ Mock exams</li>
            <li>✓ AI Tutor</li>
          </ul>
          <Link href="/register" className="block w-full py-3 rounded-xl bg-white text-brand-700 font-semibold hover:bg-brand-50 transition">Start Free Trial</Link>
        </div>
      </div>
    </div>
  );
}
