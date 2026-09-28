import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  Save,
  Layers,
  Image as ImageIcon,
  Github,
  ExternalLink,
  Code2,
  Calendar,
  User,
  Eye,
  CheckCircle2
} from 'lucide-react';
import ProjectCard from './ProjectCard.jsx';

export default function ProjectFormModal({ projectToEdit, isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const isEditing = Boolean(projectToEdit && projectToEdit.id);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Web Development',
    customCategory: '',
    shortDescription: '',
    description: '',
    problem: '',
    solution: '',
    features: [],
    technologies: [],
    image: '',
    screenshots: [],
    github: '',
    liveDemo: '',
    date: '2026',
    role: 'Developer',
    featured: false
  });

  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [screenshotInput, setScreenshotInput] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(false);

  const categoryOptions = [
    'Web Development',
    'College Project',
    'Hackathon',
    'Python',
    'AI/ML',
    'C/C++',
    'Database',
    'Custom Category'
  ];

  useEffect(() => {
    if (projectToEdit) {
      const isPredefined = categoryOptions.includes(projectToEdit.category);
      setFormData({
        ...projectToEdit,
        category: isPredefined ? projectToEdit.category : 'Custom Category',
        customCategory: isPredefined ? '' : projectToEdit.category || '',
        features: Array.isArray(projectToEdit.features) ? [...projectToEdit.features] : [],
        technologies: Array.isArray(projectToEdit.technologies) ? [...projectToEdit.technologies] : [],
        screenshots: Array.isArray(projectToEdit.screenshots) ? [...projectToEdit.screenshots] : []
      });
    } else {
      setFormData({
        id: '',
        title: '',
        slug: '',
        category: 'Web Development',
        customCategory: '',
        shortDescription: '',
        description: '',
        problem: '',
        solution: '',
        features: [],
        technologies: ['React', 'JavaScript', 'CSS'],
        image: '/images/projects/my-new-project/thumbnail.png',
        screenshots: [],
        github: '',
        liveDemo: '',
        date: String(new Date().getFullYear()),
        role: 'Developer',
        featured: false
      });
    }
  }, [projectToEdit]);

  const handleTitleChange = (val) => {
    setFormData(prev => {
      const autoSlug = !isEditing
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : prev.slug;
      return { ...prev, title: val, slug: autoSlug };
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (idx) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== idx)
    }));
  };

  const handleAddScreenshot = () => {
    if (screenshotInput.trim()) {
      setFormData(prev => ({
        ...prev,
        screenshots: [...prev.screenshots, screenshotInput.trim()]
      }));
      setScreenshotInput('');
    }
  };

  const handleRemoveScreenshot = (idx) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory =
      formData.category === 'Custom Category' && formData.customCategory.trim()
        ? formData.customCategory.trim()
        : formData.category;

    const payload = {
      ...formData,
      category: finalCategory,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative max-w-4xl w-full my-auto glass-card rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 bg-[#0b101d] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-blue">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {isEditing ? `Edit Project: ${formData.title}` : 'Add New Project'}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isEditing ? 'Update project details' : 'Creates card & detail page automatically'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 ${
                showLivePreview
                  ? 'bg-brand-blue text-slate-950 border-brand-blue'
                  : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLivePreview ? 'Hide Preview' : 'Card Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Preview Box if enabled */}
        {showLivePreview && (
          <div className="py-4 my-2 border-b border-white/10 shrink-0">
            <div className="text-xs font-mono text-brand-blue mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE CARD PREVIEW</span>
            </div>
            <div className="max-w-md mx-auto">
              <ProjectCard project={formData} />
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-5 pr-2 space-y-6">
          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Campus Find"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                URL Slug (Auto-generated) *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g., campus-find"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-brand-blue font-mono placeholder-slate-500 text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>
          </div>

          {/* Row 2: Category, Date, Role, Featured */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {formData.category === 'Custom Category' && (
                <input
                  type="text"
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  placeholder="Enter custom category name..."
                  className="mt-2 w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-brand-blue/40 text-white text-xs"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Date / Year
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-brand-blue/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Your Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Developer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>
          </div>

          {/* Row 3: Featured Toggle */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-sm font-semibold text-white block">
                  Feature this Project on Homepage
                </span>
                <span className="text-xs text-slate-400">
                  Featured projects show in the curated spotlight on the main page.
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 accent-brand-blue rounded cursor-pointer"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Short Description (Card Summary) *
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="One or two lines explaining what this project is and does..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-blue/60"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Detailed Description (Detail Page Overview)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Full story of the project, architecture decisions, and workflow..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-blue/60"
            />
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-rose-300 mb-1.5">
                The Problem Solved
              </label>
              <textarea
                rows={2}
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="What challenge does this software address?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-rose-400"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold text-emerald-300 mb-1.5">
                The Solution Implemented
              </label>
              <textarea
                rows={2}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How does your technical solution fix it?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Technologies Badges Editor */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Technologies Used
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                placeholder="Type tech name and hit Enter (e.g., Python, React, MySQL)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-blue/60"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3.5 py-2 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/30 text-xs font-mono font-semibold hover:bg-brand-blue hover:text-slate-950 transition-colors"
              >
                + Add Tech
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-mono text-slate-200"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Features Editor */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Key Features
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                placeholder="Type a feature and hit Enter..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-blue/60"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3.5 py-2 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/30 text-xs font-mono font-semibold hover:bg-brand-blue hover:text-slate-950 transition-colors"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-1.5">
              {formData.features.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-300"
                >
                  <span>• {f}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Path */}
          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
              Thumbnail Image Path
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/images/projects/your-slug/thumbnail.png"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-brand-blue/60"
            />
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Tip: Drop your pictures in <code className="text-brand-blue">/public/images/projects/{formData.slug || 'my-project'}/</code>
            </p>
          </div>

          {/* GitHub & Live Demo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository URL</span>
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/alfaizkhan/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo URL (Optional)</span>
              </label>
              <input
                type="url"
                value={formData.liveDemo}
                onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo text-slate-950 font-bold text-xs hover:from-cyan-300 hover:to-indigo-300 shadow-md shadow-brand-blue/20 transition-all duration-200 hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Publish Project'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
