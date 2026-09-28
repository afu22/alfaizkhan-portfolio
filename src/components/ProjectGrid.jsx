import React from 'react';
import ProjectCard from './ProjectCard.jsx';
import { FolderSearch } from 'lucide-react';

export default function ProjectGrid({ projects = [], onResetFilters }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center my-8 max-w-lg mx-auto border border-white/10">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-400">
          <FolderSearch className="w-7 h-7 text-brand-blue" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          No projects matched your active search or category filters. Try searching for a different keyword or technology.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-brand-blue/10 text-brand-blue border border-brand-blue/30 hover:bg-brand-blue/20 transition-colors"
          >
            Clear Search & Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id || project.slug} project={project} />
      ))}
    </div>
  );
}
