import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  User,
  Layers,
  AlertCircle,
  CheckCircle2,
  Code2,
  FolderGit2,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import ProjectImage from '../components/ProjectImage.jsx';
import TechnologyBadge from '../components/TechnologyBadge.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const { getProjectBySlug, siteConfig } = useData();

  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project && project.title) {
      document.title = `${project.title} | ${siteConfig.name}`;
    } else {
      document.title = `Project Not Found | ${siteConfig.name}`;
    }
  }, [project, slug]);

  // Safe fallback if project does not exist
  if (!project) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="glass-card max-w-lg w-full rounded-2xl p-8 text-center border border-white/10">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Project Not Found</h1>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            We couldn't find a project with the slug <code className="text-brand-blue font-mono bg-slate-900 px-1.5 py-0.5 rounded">"{slug}"</code>. It may have been renamed or removed from <code className="text-slate-300 font-mono">/data/projects.js</code>.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Projects Showcase</span>
          </Link>
        </div>
      </div>
    );
  }

  // Safe destructuring of project data with fallbacks
  const {
    title = 'Untitled Project',
    category = 'General',
    shortDescription = '',
    description = '',
    problem = '',
    solution = '',
    features = [],
    technologies = [],
    image = '',
    screenshots = [],
    github = '',
    liveDemo = '',
    date = '',
    role = ''
  } = project;

  const hasGithub = typeof github === 'string' && github.trim().length > 0;
  const hasLiveDemo = typeof liveDemo === 'string' && liveDemo.trim().length > 0;
  const featuresList = Array.isArray(features) ? features.filter(Boolean) : [];
  const techList = Array.isArray(technologies) ? technologies.filter(Boolean) : [];
  const screenshotList = Array.isArray(screenshots) ? screenshots.filter(Boolean) : [];

  return (
    <article className="py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects Showcase</span>
          </Link>

          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Project Header Info */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-blue/10 text-brand-blue border border-brand-blue/30">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              {category}
            </span>

            {date && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-900 border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {date}
              </span>
            )}

            {role && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-900 border border-white/10">
                <User className="w-3.5 h-3.5 text-brand-blue" />
                Role: {role}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h1>

          {shortDescription && (
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              {shortDescription}
            </p>
          )}

          {/* Action Buttons: GitHub & Live Demo */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {hasGithub && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs border border-white/15 hover:border-brand-blue/50 hover:bg-slate-800 transition-all shadow-sm"
              >
                <Github className="w-4 h-4 text-white" />
                <span>Source Code (GitHub) ↗</span>
              </a>
            )}

            {hasLiveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-md shadow-brand-blue/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Image / Banner */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <ProjectImage
            src={image}
            alt={title}
            category={category}
            title={title}
            aspectRatio="aspect-[16/9]"
          />
        </div>

        {/* Problem & Solution Cards (Only shown if data exists) */}
        {(problem || solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problem && (
              <div className="glass-card rounded-2xl p-6 border border-white/10 bg-rose-950/10">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Problem</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{problem}</p>
              </div>
            )}

            {solution && (
              <div className="glass-card rounded-2xl p-6 border border-white/10 bg-emerald-950/10">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{solution}</p>
              </div>
            )}
          </div>
        )}

        {/* Project Description */}
        {description && (
          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-blue" />
              <span>Project Overview</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        {/* Key Features (Only shown if features array has items) */}
        {featuresList.length > 0 && (
          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-blue" />
              <span>Key Features &amp; Architecture</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {featuresList.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 text-sm text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used (Only shown if technologies array has items) */}
        {techList.length > 0 && (
          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span>Technologies &amp; Tools Used</span>
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {techList.map((tech, idx) => (
                <TechnologyBadge key={idx} name={tech} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Screenshots Gallery (Only shown if screenshots exist) */}
        {screenshotList.length > 0 && (
          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-blue" />
                <span>Project Screenshots</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Click any image to enlarge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {screenshotList.map((screen, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedScreenshot(screen)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-brand-blue/50 transition-all"
                >
                  <ProjectImage
                    src={screen}
                    alt={`${title} screenshot ${idx + 1}`}
                    category="Screenshot"
                    title={`${title} - Preview ${idx + 1}`}
                    aspectRatio="aspect-video"
                  />
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white font-mono text-xs border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Enlarge Preview</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button & Edit Tip */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs border border-white/10 hover:border-brand-blue/50 hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Projects</span>
          </Link>

          <p className="text-xs font-mono text-slate-400 text-center sm:text-right">
            Manage projects easily in <code className="text-brand-blue">/data/projects.js</code>
          </p>
        </div>
      </div>

      {/* Lightbox Modal for Screenshots */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 text-white hover:bg-rose-500 transition-colors border border-white/20"
              aria-label="Close enlarged preview"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedScreenshot}
              alt="Enlarged screenshot preview"
              className="w-full h-auto max-h-[82vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </article>
  );
}
