export default function VideoEmbed({ url, title, channel }) {
  if (!url) return null;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="aspect-video"><iframe src={url} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={title || 'Video'} loading="lazy" /></div>
      {channel && <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500">{channel}</div>}
    </div>
  );
}
