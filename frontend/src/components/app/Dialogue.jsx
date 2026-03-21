export default function Dialogue({ turns }) {
  if (!turns?.length) return null;
  return (
    <div className="space-y-3">
      {turns.map((turn, i) => (
        <div key={i} className={`flex ${i % 2 !== 0 ? 'justify-end' : ''}`}>
          <div className={`max-w-[85%] rounded-2xl p-3.5 ${i % 2 === 0 ? 'bg-slate-50 rounded-tl-md' : 'bg-brand-50 rounded-tr-md'}`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{turn.speaker}</p>
            <p className="text-sm leading-relaxed">{turn.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
