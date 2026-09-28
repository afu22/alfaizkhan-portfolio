import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Brain,
  Code2,
  Compass,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext.jsx';

export default function About({ isPreview = false }) {
  const { siteConfig } = useData();
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>01 — Background &amp; Focus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Alfaizkhan
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Computer Science student driven by continuous curiosity, structured problem-solving, and building software from the ground up.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Who I Am Card */}
            <div className="glass-card rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue text-sm font-mono font-bold">
                  01
                </span>
                <span>Who I Am</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                I am a dedicated Computer Science Engineering student based in {siteConfig.location}. My focus centers on developing strong core software engineering skills and transitioning toward specialized applications in Artificial Intelligence and Machine Learning.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mt-3">
                Rather than memorizing theory in isolation, I prioritize <strong className="text-white">project-based learning</strong>. Every new concept—whether it is database indexing, asynchronous APIs, state management, or mathematical optimization—is tested by building a real, working project.
              </p>
            </div>

            {/* Academic Journey Card */}
            <div className="glass-card rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm font-mono font-bold">
                  02
                </span>
                <span>Academic Journey</span>
              </h3>

              <div className="space-y-4">
                {/* Degree 1 */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-base flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-brand-blue" />
                      <span>{siteConfig.education}</span>
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {siteConfig.college} • Gujarat, India
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Currently Pursuing
                  </span>
                </div>

                {/* Degree 2 */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white text-base flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <span>{siteConfig.previousEducation}</span>
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Completed Foundation in Computing Principles
                    </p>
                  </div>
                  <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-400 border border-white/10">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* AI/ML & Future Direction Card */}
            <div className="glass-card rounded-2xl p-7 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet text-sm font-mono font-bold">
                  03
                </span>
                <span>Interest in AI/ML &amp; Future Direction</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                My primary career direction is <strong className="text-white">Artificial Intelligence and Machine Learning</strong>. I am methodically developing the mathematical rigor and data science foundations required for the field, exploring Python algorithms, data structures, and machine learning principles while continuing to strengthen my full-stack software development abilities.
              </p>
            </div>
          </div>

          {/* Right Highlights & Fast Facts (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-5">
              <h4 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-blue" />
                <span>Quick Overview</span>
              </h4>

              <div className="space-y-3.5 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">CURRENT STATUS</span>
                  <span className="text-white font-semibold text-sm">CSE Undergraduate</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">COLLEGE</span>
                  <span className="text-white font-semibold text-sm">{siteConfig.college}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">LOCATION</span>
                  <span className="text-white font-semibold text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {siteConfig.location}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5">
                  <span className="text-slate-400 block mb-0.5">TARGET ROLE</span>
                  <span className="text-brand-blue font-semibold text-sm">{siteConfig.role}</span>
                </div>
              </div>

              {isPreview && (
                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-blue hover:text-white transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
