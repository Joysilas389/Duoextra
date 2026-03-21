'use client';
import { useState } from 'react';
import { videoResources } from '@/data/videos';
import VideoEmbed from '@/components/app/VideoEmbed';
import LevelFilter from '@/components/app/LevelFilter';
import PageHeader from '@/components/app/PageHeader';

export default function ListeningPage() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? videoResources : videoResources.filter(v => v.level === filter);

  return (
    <div className="max-w-4xl space-y-5">
      <PageHeader title="Listening Practice" subtitle={`${videoResources.length} videos from real German channels`} />
      <LevelFilter levels={['all','A1','A2','B1','B2']} active={filter} onChange={setFilter} />
      <div className="grid sm:grid-cols-2 gap-4">
        {list.map(v => (
          <div key={v.videoId} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="aspect-video"><iframe src={v.embedUrl} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={v.title} loading="lazy" /></div>
            <div className="p-3"><h3 className="font-semibold text-sm">{v.title}</h3>
              <div className="flex gap-2 mt-1.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{v.level}</span><span className="text-[10px] text-slate-400">{v.channel}</span><span className="text-[10px] text-slate-400">{v.topic}</span></div></div>
          </div>))}
      </div>
    </div>);
}
