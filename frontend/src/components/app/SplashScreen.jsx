'use client';
import { useState, useEffect } from 'react';

export default function SplashScreen({ children }) {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 1800); return () => clearTimeout(t); }, []);

  if (!show) return children;
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-brand-600 to-accent-600 flex flex-col items-center justify-center">
      <div className="animate-bounce mb-4">
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center shadow-2xl">
          <span className="text-white font-display font-extrabold text-3xl">D</span>
        </div>
      </div>
      <h1 className="text-white font-display font-bold text-3xl tracking-tight">DuoExtra</h1>
      <p className="text-white/60 text-sm mt-1">Master German. Pass your exam.</p>
      <div className="mt-8"><div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" /></div>
    </div>
  );
}
