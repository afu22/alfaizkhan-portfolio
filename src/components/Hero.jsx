import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Cpu,
  GraduationCap,
  Layers,
  Sparkles
} from 'lucide-react';
import { siteConfig as defaultSiteConfig } from '../config/site.js';
import { useData } from '../context/DataContext.jsx';

export default function Hero() {
  const { projects, siteConfig, privacySettings } = useData();
  const projectCount = projects.length;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Role, Intro, Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status / Track Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">{siteConfig.college}</span>
              <span className="text-slate-600">/</span>
              <span className="text-brand-blue font-semibold uppercase tracking-wider">
                {siteConfig.role}
              </span>
            </div>

            {/* Main Name & Education Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-sans">
                {siteConfig.name}
              </h1>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-blue via-indigo-300 to-brand-violet bg-clip-text text-transparent">
                  {siteConfig.title}
                </p>
                <div className="inline-block px-2.5 py-0.5 rounded bg-brand-indigo/20 border border-brand-indigo/40 text-brand-indigo font-mono text-xs font-bold tracking-widest uppercase">
                  {siteConfig.role}
                </div>
              </div>
            </div>

            {/* Short Professional Introduction (Strictly realistic & factual) */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {siteConfig.bio}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* [ View Projects ] */}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-blue text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-brand-blue/20 hover:scale-[1.02]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* [ Contact Me ] */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm border border-white/10 hover:border-brand-blue/50 hover:bg-slate-800 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>Contact Me</span>
              </Link>

              {/* [ GitHub ] - Only if URL exists & public permission enabled */}
              {privacySettings.showGithub && siteConfig.github && (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-slate-300 font-medium text-sm border border-white/10 hover:text-white hover:border-white/30 hover:bg-slate-800 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}

              {/* [ LinkedIn ] - Only if URL exists & public permission enabled */}
              {privacySettings.showLinkedin && siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-slate-300 font-medium text-sm border border-white/10 hover:text-white hover:border-white/30 hover:bg-slate-800 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>

            {/* Real-time Dynamic Stats Row */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-white font-mono">
                  {projectCount < 10 ? `0${projectCount}` : projectCount}+
                </p>
                <p className="text-xs font-mono text-slate-400">Total Projects</p>
              </div>

              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-brand-blue font-mono">B.Tech</p>
                <p className="text-xs font-mono text-slate-400">CSE Student</p>
              </div>

              <div className="space-y-0.5">
                <p className="text-2xl font-extrabold text-indigo-400 font-mono">AI / ML</p>
                <p className="text-xs font-mono text-slate-400">Target Field</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Interactive Terminal Visual */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-violet rounded-2xl opacity-40 blur-sm group-hover:opacity-60 transition duration-500" />

              <div className="relative glass-card rounded-2xl p-6 bg-[#0a0f1d] border border-white/10 shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-brand-blue" />
                    <span>alfaizkhan@workstation:~</span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="space-y-3.5 font-mono text-xs leading-relaxed">
                  <div>
                    <span className="text-brand-blue">user@alfaizkhan</span>
                    <span className="text-slate-400">:~$ </span>
                    <span className="text-white font-semibold">whoami</span>
                    <p className="text-slate-300 mt-1 pl-3 border-l-2 border-brand-blue/40">
                      Alfaizkhan · Aspiring AI/ML Engineer
                    </p>
                  </div>

                  <div>
                    <span className="text-brand-blue">user@alfaizkhan</span>
                    <span className="text-slate-400">:~$ </span>
                    <span className="text-white font-semibold">cat education.json</span>
                    <pre className="text-indigo-300 mt-1 pl-3 border-l-2 border-indigo-400/40 text-[11px] overflow-x-auto">
{`{
  "degree": "B.Tech CSE",
  "college": "Silver Oak University",
  "previous": "Diploma in Computer Engg",
  "location": "Gujarat, India"
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-brand-blue">user@alfaizkhan</span>
                    <span className="text-slate-400">:~$ </span>
                    <span className="text-white font-semibold">git status --projects</span>
                    <div className="mt-1 pl-3 border-l-2 border-emerald-400/40 text-emerald-300 space-y-1">
                      <p className="flex items-center justify-between">
                        <span>● FeeSense [Hackathon]</span>
                        <span className="text-slate-400 text-[10px]">React · TS</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>● Campus Find [College]</span>
                        <span className="text-slate-400 text-[10px]">Node · MySQL</span>
                      </p>
                      <p className="flex items-center justify-between">
                        <span>● TruckPack [Logistics]</span>
                        <span className="text-slate-400 text-[10px]">Full-Stack</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      SYSTEM READY
                    </span>
                    <span className="text-slate-400 font-mono">
                      CMS: /data/projects.js
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
