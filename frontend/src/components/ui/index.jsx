// ─── Button ───────────────────────────────────
export function Button({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500';
  const variants = {
    primary: 'bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:shadow-glow disabled:opacity-60',
    secondary: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-300',
    ghost: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

// ─── Card ─────────────────────────────────────
export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 ${
        hover ? 'card-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Badge / Pill ─────────────────────────────
export function Pill({ children, color = 'brand', className = '' }) {
  const colors = {
    brand: 'bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
    purple: 'bg-purple-50 text-purple-700',
    slate: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]} ${className}`}>
      {children}
    </span>
  );
}

// ─── Progress Bar ─────────────────────────────
export function ProgressBar({ value, max = 100, color = 'brand', className = '' }) {
  const pct = Math.min(100, (value / max) * 100);
  const colors = {
    brand: 'from-brand-500 to-accent-500',
    green: 'from-green-400 to-emerald-500',
    amber: 'from-amber-400 to-orange-500',
  };
  return (
    <div className={`w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full bg-gradient-to-r ${colors[color]} rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Stat Card ────────────────────────────────
export function StatCard({ icon: Icon, label, value, color = 'text-brand-600', subtext }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className={`font-display font-bold text-2xl ${color}`}>{value}</p>
          {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── Empty State ──────────────────────────────
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <Card className="text-center py-16 px-8">
      {Icon && <Icon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />}
      <h3 className="font-display font-semibold text-lg mb-1">{title}</h3>
      {description && <p className="text-slate-500 text-sm max-w-md mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}

// ─── Spinner ──────────────────────────────────
export function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <div className={`${sizes[size]} border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin ${className}`} />
  );
}

// ─── Level Badge ──────────────────────────────
export function LevelBadge({ level, size = 'md' }) {
  const colors = {
    A1: 'from-green-400 to-emerald-500',
    A2: 'from-blue-400 to-cyan-500',
    B1: 'from-violet-400 to-purple-500',
    B2: 'from-orange-400 to-amber-500',
    C1: 'from-red-400 to-rose-500',
    C2: 'from-slate-600 to-slate-800',
  };
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-xl',
  };
  return (
    <div className={`${sizes[size]} rounded-xl bg-gradient-to-br ${colors[level] || 'from-slate-400 to-slate-500'} flex items-center justify-center font-display font-bold text-white`}>
      {level}
    </div>
  );
}
