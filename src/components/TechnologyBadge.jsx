import React from 'react';

/**
 * Reusable Technology Badge with subtle dark developer styling
 */
export default function TechnologyBadge({ name, size = 'sm' }) {
  if (!name) return null;

  const sizeClasses =
    size === 'xs'
      ? 'px-2 py-0.5 text-[11px]'
      : size === 'md'
      ? 'px-3 py-1 text-sm'
      : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 shadow-sm hover:border-brand-blue/40 hover:text-white transition-colors duration-200 select-none ${sizeClasses}`}
    >
      <span className="w-1 h-1 rounded-full bg-brand-blue/60" />
      {name}
    </span>
  );
}
