import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, FolderGit2 } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import Skills from '../components/Skills.jsx';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import { useData } from '../context/DataContext.jsx';

export default function Home() {
  const { projects, getFeaturedProjects, siteConfig } = useData();

  useEffect(() => {
    document.title = `${siteConfig.name} | Developer Portfolio — ${siteConfig.role}`;
    window.scrollTo(0, 0);
  }, [siteConfig]);

  const featuredList = getFeaturedProjects();

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Projects Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-blue/10 text-brand-blue font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-blue/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Selected Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-2 text-slate-400 text-sm max-w-xl">
                Highlighting hands-on hackathon submissions, college systems, and software platforms.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-brand-blue font-mono text-xs font-semibold border border-white/10 hover:border-brand-blue/50 hover:bg-slate-800 transition-all self-start sm:self-auto"
            >
              <span>Explore All {projects.length} Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredList.map((project) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Skills Section Preview */}
      <Skills isPreview={true} />

      {/* 4. About Section Preview */}
      <About isPreview={true} />

      {/* 5. Contact Section & CTA */}
      <Contact />
    </div>
  );
}
