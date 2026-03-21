'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Key, Volume2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function ConversationDetailPage() {
  const { slug } = useParams();
  const [conv, setConv] = useState(null);
  const [showTranslation, setShowTranslation] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('duoextra_token');
    fetch(`${API}/conversations/${slug}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null).then(d => setConv(d)).catch(() => {});
  }, [slug]);

  if (!conv) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" /></div>;

  const toggleTranslation = (i) => setShowTranslation(p => ({...p, [i]: !p[i]}));

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/dashboard/conversations" className="flex items-center gap-1 text-sm text-brand-600"><ArrowLeft className="w-4 h-4" />Back</Link>
      <div><span className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{conv.level}</span>
        <h1 className="font-display font-bold text-2xl mt-2">{conv.title}</h1>
        <p className="text-slate-500 mt-1">{conv.description}</p></div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-display font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-brand-600" />Dialogue</h2>
        <div className="space-y-4">
          {(conv.turns || []).map((turn, i) => {
            const isLeft = i % 2 === 0;
            return (<div key={i} className={`flex ${isLeft ? '' : 'justify-end'}`}>
              <div className={`max-w-[80%] ${isLeft ? 'bg-slate-50' : 'bg-brand-50'} rounded-2xl p-4 ${isLeft ? 'rounded-tl-md' : 'rounded-tr-md'}`}>
                <p className="text-xs font-semibold text-slate-400 mb-1">{turn.speakerRole}</p>
                <p className="text-sm leading-relaxed">{turn.text}</p>
                {turn.translation && (<button onClick={() => toggleTranslation(i)} className="text-xs text-brand-600 mt-2 hover:text-brand-700">
                  {showTranslation[i] ? turn.translation : 'Show translation'}</button>)}
              </div></div>);})}
        </div>
      </div>

      {conv.keyPhrases && conv.keyPhrases.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-display font-semibold mb-4 flex items-center gap-2"><Key className="w-5 h-5 text-amber-600" />Key Phrases</h2>
          <div className="space-y-3">
            {conv.keyPhrases.map((kp, i) => (
              <div key={i} className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="font-medium text-sm">{kp.phrase}</p>
                {kp.translation && <p className="text-xs text-slate-500 mt-1">{kp.translation}</p>}
              </div>))}
          </div>
        </div>)}
    </div>);
}
