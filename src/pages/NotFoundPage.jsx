import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { siteConfig } from '../config/site.js';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = `404 - Page Not Found | ${siteConfig.name}`;
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="glass-card max-w-md w-full rounded-2xl p-8 text-center border border-white/10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">
          404 ERROR
        </span>
        <h1 className="text-2xl font-bold text-white mt-1 mb-2">Page Not Found</h1>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          The requested page does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
