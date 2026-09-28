import React from 'react';
import { Search, X } from 'lucide-react';

export default function ProjectFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories = [],
  totalCount = 0,
  filteredCount = 0
}) {
  return (
    <div className="space-y-6 mb-10">
      {/* Top Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search input container */}
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-brand-blue" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title, description, or technology (e.g., React, Python, MySQL)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dynamic Project Counter Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center font-mono text-xs text-slate-400 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-white/10">
          <span>SHOWING:</span>
          <span className="font-semibold text-brand-blue">{filteredCount}</span>
          <span>OF</span>
          <span className="font-semibold text-white">{totalCount}</span>
          <span>PROJECTS</span>
        </div>
      </div>

      {/* Category Filter Pills (Dynamically loaded from projects.js data) */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((category) => {
          const isActive = activeCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 select-none ${
                isActive
                  ? 'bg-brand-blue text-slate-950 font-bold shadow-md shadow-brand-blue/25 scale-[1.02]'
                  : 'bg-slate-900/80 text-slate-300 border border-white/10 hover:border-brand-blue/40 hover:text-white hover:bg-slate-800'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
