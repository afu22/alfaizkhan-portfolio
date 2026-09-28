import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Linkedin, Mail, Sparkles, Lock } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';

export default function Footer() {
  const { siteConfig, privacySettings } = useData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10 bg-[#060910] text-slate-400 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Bio column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-indigo flex items-center justify-center text-slate-950 font-mono font-bold shadow-md shadow-brand-blue/20">
                <Terminal className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight font-sans text-white group-hover:text-brand-blue transition-colors">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {siteConfig.bio}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <span>{siteConfig.education}</span>
              <span>•</span>
              <span>{siteConfig.college}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-blue transition-colors">
                  Projects Showcase
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-brand-blue transition-colors">
                  Skills &amp; Toolkit
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-blue transition-colors">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column (Respects Privacy Controls) */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              {privacySettings.showGithub && siteConfig.github && (
                <li>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-400" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
              {privacySettings.showLinkedin && siteConfig.linkedin && (
                <li>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-slate-400" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
              {privacySettings.showEmail && siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>Email Me</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
              <span>Dynamic CMS Ready</span>
            </span>
            <span className="text-slate-700">•</span>
            {/* Discreet Admin Portal Link */}
            <Link
              to="/admin"
              title="Admin Portal (Private)"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-blue transition-colors px-2 py-1 rounded bg-slate-900/60 border border-white/5 hover:border-brand-blue/30"
            >
              <Lock className="w-3 h-3 text-brand-blue" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
