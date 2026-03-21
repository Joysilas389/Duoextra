export default function LevelFilter({ levels, active, onChange, counts }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {levels.map(l => (
        <button key={l} onClick={() => onChange(l)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${active === l ? 'bg-brand-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300 active:bg-slate-50'}`}>
          {l === 'all' ? 'All' : l}{counts?.[l] != null ? ` (${counts[l]})` : ''}
        </button>
      ))}
    </div>
  );
}
