import React, { useState } from 'react';
import { Code2, FolderGit2 } from 'lucide-react';

/**
 * Reusable project image component with bulletproof fallback handling.
 * If the image path is missing, 404s, or fails to load, it automatically
 * renders a sleek, professional placeholder with project title and category.
 */
export default function ProjectImage({
  src,
  alt = 'Project Image',
  category = 'Project',
  title = '',
  className = '',
  aspectRatio = 'aspect-video'
}) {
  const [hasError, setHasError] = useState(false);

  // If no source is provided or image failed to load, show the vector fallback
  if (!src || hasError) {
    return (
      <div
        className={`relative ${aspectRatio} w-full overflow-hidden bg-gradient-to-br from-slate-900 via-[#0e1628] to-[#070b14] border-b border-white/5 flex flex-col justify-between p-5 select-none ${className}`}
      >
        {/* Subtle background tech grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient radial glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top category tag */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            {category}
          </span>
          <FolderGit2 className="w-4 h-4 text-slate-500" />
        </div>

        {/* Center / Bottom monogram & title */}
        <div className="relative z-10 my-auto">
          <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center text-brand-blue mb-2.5 shadow-inner">
            <Code2 className="w-5 h-5" />
          </div>
          <h4 className="text-base font-semibold text-white tracking-tight line-clamp-1">
            {title || 'Developer Project'}
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            ~/projects/{title ? title.toLowerCase().replace(/\s+/g, '-') : 'preview'}
          </p>
        </div>

        {/* Bottom subtle code bar */}
        <div className="relative z-10 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>SOURCE CODE READY</span>
          <span>v1.0</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${aspectRatio} w-full overflow-hidden bg-slate-950 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
