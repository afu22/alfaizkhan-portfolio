import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Calendar, User } from 'lucide-react';
import ProjectImage from './ProjectImage.jsx';
import TechnologyBadge from './TechnologyBadge.jsx';

export default function ProjectCard({ project }) {
  if (!project) return null;

  // Safe destructuring with fallbacks for every single field
  const {
    id,
    title = 'Untitled Project',
    slug = id || 'project',
    category = 'General',
    shortDescription = 'No description provided.',
    technologies = [],
    image = '',
    github = '',
    liveDemo = '',
    date = '',
    role = '',
    featured = false
  } = project;

  // Safe checks for buttons
  const hasGithub = typeof github === 'string' && github.trim().length > 0;
  const hasLiveDemo = typeof liveDemo === 'string' && liveDemo.trim().length > 0;
  const techList = Array.isArray(technologies) ? technologies : [];

  return (
    <article className="group glass-card rounded-xl overflow-hidden flex flex-col h-full border border-white/10 hover:border-brand-blue/40 transition-all duration-300">
      {/* Top Banner / Image */}
      <div className="relative overflow-hidden">
        <Link to={`/projects/${slug}`} className="block focus:outline-none focus:ring-2 focus:ring-brand-blue/50">
          <ProjectImage
            src={image}
            alt={title}
            category={category}
            title={title}
            aspectRatio="aspect-[16/10]"
          />
        </Link>

        {/* Featured Pill Overlay */}
        {featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata row: Category, Date, Role */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2 font-mono">
            <span className="text-brand-blue font-medium uppercase tracking-wider text-[11px]">
              {category}
            </span>
            {date && (
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors duration-200 line-clamp-1">
            <Link to={`/projects/${slug}`} className="focus:outline-none focus:underline">
              {title}
            </Link>
          </h3>

          {/* Role badge if available */}
          {role && (
            <p className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1">
              <User className="w-3 h-3 text-slate-400" />
              <span>{role}</span>
            </p>
          )}

          {/* Short Description */}
          <p className="mt-2 text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>

          {/* Technology Badges */}
          {techList.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {techList.slice(0, 5).map((tech, index) => (
                <TechnologyBadge key={`${tech}-${index}`} name={tech} size="xs" />
              ))}
              {techList.length > 5 && (
                <span className="text-[11px] font-mono text-slate-400 self-center pl-1">
                  +{techList.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer / Action Buttons */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          {/* View Project Details Button */}
          <Link
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-white group/btn transition-colors duration-200 py-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>

          {/* External Links (GitHub & Live Demo) — ONLY RENDERED IF URL EXISTS */}
          <div className="flex items-center gap-2">
            {hasGithub && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${title} source on GitHub`}
                className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {hasLiveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
                className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
