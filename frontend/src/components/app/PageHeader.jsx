export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-1">
      <h1 className="font-display font-bold text-xl sm:text-2xl">{title}</h1>
      {subtitle && <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>}
    </div>
  );
}
