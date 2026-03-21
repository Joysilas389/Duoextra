'use client';
import Link from 'next/link';
export default function FeaturesPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto pt-24">
      <Link href="/" className="text-brand-600 text-sm font-medium">← Back to home</Link>
      <h1 className="font-display font-bold text-4xl mt-4 mb-6">Features</h1>
      <div className="space-y-6 text-slate-600">
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">🎧 Listening Practice</h3><p>Exam-style audio tasks with native speaker recordings across all CEFR levels.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">📖 Reading Comprehension</h3><p>Articles, emails, forms, and academic texts matched to Goethe & telc formats.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">✍️ Writing Practice</h3><p>Email, letter, essay, and opinion writing tasks with AI feedback.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">🎤 Speaking Practice</h3><p>Record your voice, get AI pronunciation and fluency feedback.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">🧠 Grammar Center</h3><p>Cases, verbs, prepositions — all explained with examples and drills.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">💬 Real-Life Conversations</h3><p>200+ scenarios for doctor visits, apartment hunting, job interviews, and more.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">📝 Mock Exams</h3><p>Full-length timed mock exams for Goethe and telc, with section-by-section scoring.</p></div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200"><h3 className="font-semibold text-lg mb-2">🤖 AI Tutor</h3><p>Personal German language assistant for grammar help, writing coaching, and roleplay.</p></div>
      </div>
    </div>
  );
}
