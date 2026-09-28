import React from 'react';
import { Code, Globe, Database, Wrench, Brain, Sparkles } from 'lucide-react';

export default function Skills({ isPreview = false }) {
  const skillCategories = [
    {
      name: 'Programming Languages',
      icon: Code,
      badge: 'Core Foundations',
      description: 'Languages used for coursework, algorithms, and project logic.',
      skills: [
        { name: 'Python', status: 'Core / Active' },
        { name: 'C', status: 'Academic Foundation' },
        { name: 'C++', status: 'Academic Foundation' },
        { name: 'JavaScript', status: 'Web & Backend' }
      ]
    },
    {
      name: 'Web Development',
      icon: Globe,
      badge: 'Practical Systems',
      description: 'Building responsive user interfaces and backend REST services.',
      skills: [
        { name: 'HTML5', status: 'Semantic UI' },
        { name: 'CSS3 / Tailwind', status: 'Modern Styling' },
        { name: 'JavaScript (ES6+)', status: 'Frontend & APIs' },
        { name: 'React', status: 'Component Architecture' },
        { name: 'Node.js', status: 'Backend APIs' }
      ]
    },
    {
      name: 'Database & Storage',
      icon: Database,
      badge: 'Relational Modeling',
      description: 'Relational schema design, queries, and integration.',
      skills: [
        { name: 'MySQL', status: 'Relational DB / Queries' }
      ]
    },
    {
      name: 'Developer Tools',
      icon: Wrench,
      badge: 'Workflow',
      description: 'Daily tools for version control and development productivity.',
      skills: [
        { name: 'Git', status: 'Version Control' },
        { name: 'GitHub', status: 'Code Collaboration' },
        { name: 'VS Code', status: 'Primary IDE' }
      ]
    },
    {
      name: 'AI & Machine Learning',
      icon: Brain,
      badge: 'Active Exploration',
      description: 'Foundational learning path toward applied intelligence and models.',
      skills: [
        { name: 'Machine Learning', status: 'Learning / Exploring' },
        { name: 'Data Fundamentals', status: 'Learning / Exploring' },
        { name: 'Python for AI/ML', status: 'Learning / Exploring' }
      ]
    }
  ];

  const displayedCategories = isPreview ? skillCategories.slice(0, 4) : skillCategories;

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-blue/10 text-brand-blue font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-blue/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 — Technical Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Technologies I use to build practical applications, along with current areas of active learning and academic focus.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-brand-blue/30 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-brand-blue shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5">{cat.name}</h3>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">{cat.description}</p>

                  {/* Individual Skills list */}
                  <div className="space-y-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs font-mono"
                      >
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {skill.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>CATEGORY {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <span className="text-emerald-400/80">● ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
