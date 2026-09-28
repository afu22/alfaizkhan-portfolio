import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import ProjectFilters from '../components/ProjectFilters.jsx';
import ProjectGrid from '../components/ProjectGrid.jsx';
import { useData } from '../context/DataContext.jsx';

export default function Projects() {
  const { projects, getAllCategories, siteConfig } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = `Projects Showcase | ${siteConfig.name} Portfolio`;
    window.scrollTo(0, 0);
  }, [siteConfig]);

  const categories = useMemo(() => getAllCategories(), [projects]);

  // Filter projects dynamically across Title, Description, Technologies, and Category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category filter
      const matchesCategory =
        activeCategory.toLowerCase() === 'all' ||
        (project.category && project.category.toLowerCase() === activeCategory.toLowerCase());

      // 2. Search query filter
      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase().trim();
      const inTitle = project.title && project.title.toLowerCase().includes(q);
      const inShortDesc = project.shortDescription && project.shortDescription.toLowerCase().includes(q);
      const inDesc = project.description && project.description.toLowerCase().includes(q);
      const inCategory = project.category && project.category.toLowerCase().includes(q);
      const inProblem = project.problem && project.problem.toLowerCase().includes(q);
      const inSolution = project.solution && project.solution.toLowerCase().includes(q);
      const inTech = Array.isArray(project.technologies) &&
        project.technologies.some((t) => typeof t === 'string' && t.toLowerCase().includes(q));

      const matchesSearch = inTitle || inShortDesc || inDesc || inCategory || inTech || inProblem || inSolution;

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-blue/10 text-brand-blue font-mono text-xs font-semibold uppercase tracking-wider mb-3 border border-brand-blue/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Portfolio Archives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects Showcase
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            All college systems, hackathon submissions, and practical applications. Powered by a single source of truth in <code className="text-brand-blue bg-slate-900 px-1.5 py-0.5 rounded border border-white/10">/data/projects.js</code>.
          </p>
        </div>

        {/* Search & Dynamic Category Filters */}
        <ProjectFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={categories}
          totalCount={projects.length}
          filteredCount={filteredProjects.length}
        />

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
}
