import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, MessageSquare, Copy, Shield, Lock, Phone } from 'lucide-react';
import { useData } from '../context/DataContext.jsx';

export default function Contact() {
  const { siteConfig, privacySettings } = useData();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (privacySettings.showEmail && siteConfig.email) {
      navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>03 — Let's Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Interested in collaborating on a project, discussing software development, or sharing advice on AI/ML learning? Feel free to reach out.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Email Card (Respects Privacy Permission) */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-white">Email</h3>
                {!privacySettings.showEmail && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3 text-brand-blue" />
                    <span>Private</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-4">
                {privacySettings.showEmail
                  ? 'Reach out directly via email for projects or professional inquiries.'
                  : 'Email address is kept private by admin permissions.'}
              </p>

              {privacySettings.showEmail ? (
                <p className="text-sm font-mono text-slate-200 break-all select-all p-2 rounded bg-slate-900/80 border border-white/5">
                  {siteConfig.email}
                </p>
              ) : (
                <p className="text-xs font-mono text-slate-400 p-2.5 rounded bg-slate-900/60 border border-white/5 italic">
                  [Private — Connect via LinkedIn]
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {privacySettings.showEmail ? (
                <>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-brand-blue text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Copy email to clipboard"
                    aria-label="Copy email to clipboard"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </>
              ) : (
                <a
                  href={siteConfig.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 text-brand-blue font-bold text-xs hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* 2. GitHub Card (Respects Privacy Permission) */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-200 mb-4">
                <Github className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-white">GitHub</h3>
                {!privacySettings.showGithub && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3 text-brand-blue" />
                    <span>Private</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-4">
                {privacySettings.showGithub
                  ? 'Explore project source code, repositories, commits, and experiments.'
                  : 'GitHub profile link is kept private by admin permissions.'}
              </p>
              {privacySettings.showGithub ? (
                <p className="text-sm font-mono text-slate-200 break-all p-2 rounded bg-slate-900/80 border border-white/5">
                  {siteConfig.github ? siteConfig.github.replace('https://', '') : 'github.com'}
                </p>
              ) : (
                <p className="text-xs font-mono text-slate-400 p-2.5 rounded bg-slate-900/60 border border-white/5 italic">
                  [Profile link private]
                </p>
              )}
            </div>

            <div className="mt-6">
              {privacySettings.showGithub && siteConfig.github ? (
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-900 text-white font-medium text-xs border border-white/10 hover:border-white/30 hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Visit GitHub Profile ↗</span>
                </a>
              ) : (
                <div className="w-full py-2 px-4 rounded-lg bg-slate-900/40 text-slate-500 font-mono text-xs text-center border border-white/5">
                  Hidden by Admin
                </div>
              )}
            </div>
          </div>

          {/* 3. LinkedIn Card (Respects Privacy Permission) */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0a66c2]/10 border border-[#0a66c2]/20 flex items-center justify-center text-[#0a66c2] mb-4">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-white">LinkedIn</h3>
                {!privacySettings.showLinkedin && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    <Lock className="w-3 h-3 text-brand-blue" />
                    <span>Private</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mb-4">
                {privacySettings.showLinkedin
                  ? 'Connect professionally, share student milestones, and network.'
                  : 'LinkedIn profile link is kept private by admin permissions.'}
              </p>
              {privacySettings.showLinkedin ? (
                <p className="text-sm font-mono text-slate-200 break-all p-2 rounded bg-slate-900/80 border border-white/5">
                  {siteConfig.linkedin ? siteConfig.linkedin.replace('https://', '') : 'linkedin.com'}
                </p>
              ) : (
                <p className="text-xs font-mono text-slate-400 p-2.5 rounded bg-slate-900/60 border border-white/5 italic">
                  [Profile link private]
                </p>
              )}
            </div>

            <div className="mt-6">
              {privacySettings.showLinkedin && siteConfig.linkedin ? (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-900 text-white font-medium text-xs border border-white/10 hover:border-[#0a66c2]/40 hover:bg-slate-800 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                  <span>Connect on LinkedIn ↗</span>
                </a>
              ) : (
                <div className="w-full py-2 px-4 rounded-lg bg-slate-900/40 text-slate-500 font-mono text-xs text-center border border-white/5">
                  Hidden by Admin
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional Phone Card if enabled by Admin */}
        {privacySettings.showPhone && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Phone className="w-4 h-4" />
              <span>Public Phone: {privacySettings.phoneNumber || '+91 Available'}</span>
            </div>
            <span className="text-[11px] text-slate-500">Visible by Admin Permission</span>
          </div>
        )}

        {/* Friendly Config / Admin Reminder */}
        <div className="mt-10 p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue" />
            <span>
              Manage your details anytime in the <a href="/admin" className="text-brand-blue hover:underline">Admin Portal</a>.
            </span>
          </div>
          <span className="text-slate-400">{siteConfig.location}</span>
        </div>
      </div>
    </section>
  );
}
