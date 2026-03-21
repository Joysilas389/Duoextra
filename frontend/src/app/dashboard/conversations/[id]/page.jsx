'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { conversations } from '@/data/conversations';
import VideoEmbed from '@/components/app/VideoEmbed';
import Dialogue from '@/components/app/Dialogue';
import { ArrowLeft, Key, MessageSquare } from 'lucide-react';

export default function ConversationDetail() {
  const { id } = useParams();
  const conv = conversations.find(c => c.id === id);
  if (!conv) return <div className="text-center py-16"><p className="font-semibold">Not found</p><Link href="/dashboard/conversations" className="text-brand-600 text-sm">Back</Link></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <Link href="/dashboard/conversations" className="flex items-center gap-1 text-sm text-brand-600"><ArrowLeft className="w-4 h-4" />Back</Link>
      <div><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{conv.level}</span>
        <h1 className="font-display font-bold text-xl mt-2">{conv.title}</h1><p className="text-slate-500 text-sm mt-0.5">{conv.description}</p></div>
      {conv.videoUrl && <VideoEmbed url={conv.videoUrl} title={conv.title} channel={conv.videoChannel} />}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="font-display font-semibold text-sm mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-brand-600" />Dialogue</h2>
        <Dialogue turns={conv.turns} />
      </div>
      {conv.keyPhrases?.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="font-display font-semibold text-sm mb-3 flex items-center gap-2"><Key className="w-4 h-4 text-amber-600" />Key Phrases</h2>
          <div className="space-y-2">{conv.keyPhrases.map((kp,i) => (
            <div key={i} className="p-3 rounded-lg bg-amber-50 border border-amber-100"><p className="font-medium text-sm">{kp.de}</p><p className="text-xs text-slate-500 mt-0.5">{kp.en}</p></div>))}</div>
        </div>)}
    </div>);
}
