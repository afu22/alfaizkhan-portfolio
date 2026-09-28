import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Plus,
  Edit3,
  Trash2,
  Star,
  ExternalLink,
  Shield,
  ShieldCheck,
  User,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  KeyRound,
  FileText,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  Download
} from 'lucide-react';
import { useData } from '../context/DataContext.jsx';
import ProjectFormModal from './ProjectFormModal.jsx';
import TechnologyBadge from './TechnologyBadge.jsx';

export default function AdminDashboard() {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    siteConfig,
    updateSiteConfig,
    privacySettings,
    updatePrivacySettings,
    adminLogout,
    changeAdminPassword,
    resetToDefaults
  } = useData();

  // Active Tab: 'projects' | 'profile' | 'privacy' | 'security'
  const [activeTab, setActiveTab] = useState('projects');

  // Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Search & Filter in Admin
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');

  // Profile Form Local State
  const [profileForm, setProfileForm] = useState({ ...siteConfig });

  // Privacy Form Local State
  const [privacyForm, setPrivacyForm] = useState({ ...privacySettings });

  // Security Form State
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState({ type: '', text: '' });

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handlers for Projects
  const handleOpenAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id || editingProject.slug, projectData);
      showToast(`Updated project "${projectData.title}"!`);
    } else {
      addProject(projectData);
      showToast(`Added new project "${projectData.title}"!`);
    }
  };

  const handleDeleteProject = (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"? This cannot be undone.`)) {
      deleteProject(project.id || project.slug);
      showToast(`Deleted "${project.title}"`, 'info');
    }
  };

  const handleExportJson = () => {
    try {
      const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'projects.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Downloaded projects.json backup!');
    } catch (e) {
      showToast('Export failed', 'error');
    }
  };

  // Handlers for Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateSiteConfig(profileForm);
    showToast('Profile and site information updated!');
  };

  // Handlers for Privacy
  const handleTogglePrivacy = (key) => {
    const updated = { ...privacyForm, [key]: !privacyForm[key] };
    setPrivacyForm(updated);
    updatePrivacySettings(updated);
    showToast(`Privacy setting "${key}" updated!`);
  };

  // Handlers for Passcode change
  const handleChangePassword = (e) => {
    e.preventDefault();
    const res = changeAdminPassword(currentPwd, newPwd);
    if (res.success) {
      setPwdMsg({ type: 'success', text: 'Passcode changed successfully!' });
      setCurrentPwd('');
      setNewPwd('');
    } else {
      setPwdMsg({ type: 'error', text: res.error || 'Failed to change passcode.' });
    }
  };

  // Filtered projects for admin table
  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      projectCategoryFilter === 'All' ||
      (p.category && p.category.toLowerCase() === projectCategoryFilter.toLowerCase());
    const q = projectSearch.toLowerCase().trim();
    const inTitle = p.title && p.title.toLowerCase().includes(q);
    const inTech = Array.isArray(p.technologies) && p.technologies.some((t) => t.toLowerCase().includes(q));
    return matchesCat && (inTitle || inTech);
  });

  const featuredCount = projects.filter((p) => Boolean(p.featured)).length;
  const categoriesList = Array.from(new Set(['All', ...projects.map((p) => p.category).filter(Boolean)]));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
          <div className="glass-panel px-4 py-3 rounded-2xl border border-brand-blue/30 shadow-2xl flex items-center gap-3 bg-[#0d1424]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-white">{toast.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Bar */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-indigo flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg shadow-brand-blue/20">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Admin Command Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE &amp; PROTECTED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Logged in as <strong>{siteConfig.name}</strong> • Changes apply immediately
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-brand-blue/40 transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Total Projects
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {projects.length < 10 ? `0${projects.length}` : projects.length}
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-1 block">
              Auto-rendered in showcase
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Featured on Home
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-mono">
              {featuredCount < 10 ? `0${featuredCount}` : featuredCount}
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-1 block">
              Displayed in curated spotlight
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Active Categories
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">
              {categoriesList.length - 1}
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-1 block">
              Dynamic category tags
            </span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Privacy Guard
            </span>
            <div className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1.5 mt-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Protected Mode</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-1 block">
              Public access restricted
            </span>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-brand-blue text-slate-950 shadow-md shadow-brand-blue/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Projects Manager ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-brand-blue text-slate-950 shadow-md shadow-brand-blue/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile &amp; Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-brand-blue text-slate-950 shadow-md shadow-brand-blue/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy &amp; Permissions</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-brand-blue text-slate-950 shadow-md shadow-brand-blue/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Security &amp; Passcode</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: PROJECTS MANAGER */}
        {/* ======================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Action Bar: Add Project + Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo text-slate-950 font-bold text-xs hover:from-cyan-300 hover:to-indigo-300 shadow-lg shadow-brand-blue/20 transition-all hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project Directly</span>
                </button>

                <button
                  onClick={handleExportJson}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-900 border border-white/10 hover:border-brand-blue/40 text-slate-300 hover:text-white text-xs font-mono transition-all"
                  title="Export projects.json backup"
                >
                  <Download className="w-4 h-4 text-brand-blue" />
                  <span className="hidden sm:inline">Export JSON</span>
                </button>
              </div>

              <div className="flex items-center gap-3 flex-1 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search projects by title or tech..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-blue/60"
                  />
                </div>

                <select
                  value={projectCategoryFilter}
                  onChange={(e) => setProjectCategoryFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:outline-none"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Projects Table / Grid */}
            <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-white/10 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Technologies</th>
                      <th className="py-3.5 px-4 text-center">Featured</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          No projects found matching your search.
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((project) => (
                        <tr key={project.id || project.slug} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4 font-sans font-semibold text-white">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/10">
                                {project.image ? (
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.target.style.display = 'none')}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[10px] text-brand-blue font-mono font-bold">
                                    {project.title.slice(0, 2).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div>
                                <span className="block text-sm text-white">{project.title}</span>
                                <span className="text-[11px] font-mono text-slate-400">
                                  /projects/{project.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-md bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
                              {project.category}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {(project.technologies || []).slice(0, 3).map((t, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                                  {t}
                                </span>
                              ))}
                              {(project.technologies || []).length > 3 && (
                                <span className="text-[10px] text-slate-500 self-center">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => toggleFeatured(project.id || project.slug)}
                              title={project.featured ? 'Featured on Homepage' : 'Not featured'}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                project.featured
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-900 text-slate-600 border-white/5 hover:text-slate-400'
                              }`}
                            >
                              <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/projects/${project.slug}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-brand-blue hover:bg-slate-800 transition-colors"
                                title="Preview detail page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleOpenEditModal(project)}
                                className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                title="Edit project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project)}
                                className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                                title="Delete project"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PROFILE & IDENTITY */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Profile &amp; Biography</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Update your public name, tagline, college, and social profiles.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-indigo text-slate-950 font-bold text-xs hover:from-cyan-300 hover:to-indigo-300 shadow-md shadow-brand-blue/20 transition-all hover:scale-[1.02]"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Degree Title
                </label>
                <input
                  type="text"
                  value={profileForm.title || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={profileForm.role || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  College / University
                </label>
                <input
                  type="text"
                  value={profileForm.college || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Previous Degree
                </label>
                <input
                  type="text"
                  value={profileForm.previousEducation || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, previousEducation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={profileForm.location || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Hero Introduction / Bio
              </label>
              <textarea
                rows={2}
                value={profileForm.bio || ''}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                About Page Detailed Story
              </label>
              <textarea
                rows={3}
                value={profileForm.aboutDetailed || ''}
                onChange={(e) => setProfileForm({ ...profileForm, aboutDetailed: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-blue/60"
              />
            </div>

            {/* Contact links */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-bold text-white mb-4">Contact Links &amp; Profiles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={profileForm.email || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-300" />
                    <span>GitHub Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={profileForm.github || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                    <span>LinkedIn Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedin || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Resume Link (PDF or Drive)</span>
                  </label>
                  <input
                    type="text"
                    value={profileForm.resumeUrl || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                    placeholder="/resume.pdf or Google Drive link"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PRIVACY & PERMISSIONS */}
        {/* ======================================================== */}
        {activeTab === 'privacy' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <div className="pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-brand-blue" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Public Privacy &amp; Detail Permissions
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                You control what public visitors can see. Only details you grant permission for are displayed.
              </p>
            </div>

            <div className="space-y-4">
              {/* Permission 1: Email */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-blue" />
                    <span className="text-sm font-semibold text-white">Show Email Address Publicly</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    When disabled, your raw email address is masked with a protected privacy badge on the contact page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePrivacy('showEmail')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    privacyForm.showEmail ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      privacyForm.showEmail ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Permission 2: Phone Number */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">Show Phone Number Publicly</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    When disabled, your private phone number is completely hidden from public visitors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePrivacy('showPhone')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    privacyForm.showPhone ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      privacyForm.showPhone ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Permission 3: Resume Download */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-semibold text-white">Show Resume Download Button</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    When disabled, resume download links are concealed from public visitors.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePrivacy('showResume')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    privacyForm.showResume ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      privacyForm.showResume ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Permission 4: GitHub Link */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-300" />
                    <span className="text-sm font-semibold text-white">Show GitHub Profile Link</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Controls whether GitHub buttons appear in navbar, hero, and footer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePrivacy('showGithub')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    privacyForm.showGithub ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      privacyForm.showGithub ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Permission 5: LinkedIn Link */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                    <span className="text-sm font-semibold text-white">Show LinkedIn Profile Link</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Controls whether LinkedIn buttons appear in navbar, hero, and footer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePrivacy('showLinkedin')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    privacyForm.showLinkedin ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      privacyForm.showLinkedin ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SECURITY & PASSCODE */}
        {/* ======================================================== */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Change Passcode */}
            <form onSubmit={handleChangePassword} className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <KeyRound className="w-5 h-5 text-brand-blue" />
                <h3 className="text-lg font-bold text-white">Change Admin Passcode</h3>
              </div>

              {pwdMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    pwdMsg.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {pwdMsg.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  )}
                  <span>{pwdMsg.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  Current Passcode
                </label>
                <input
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  placeholder="Enter current passcode..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                  New Passcode (Min 4 chars)
                </label>
                <input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Enter new private passcode..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-brand-blue/60"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-blue text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors shadow-md shadow-brand-blue/20"
              >
                Update Admin Passcode
              </button>
            </form>

            {/* Factory Reset */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-amber-400">
                  <RotateCcw className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white">Reset to Initial Starter Data</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-3">
                  This will restore your portfolio projects and site configuration to the default starter data. Useful if you ever want a clean state.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all portfolio projects and site configurations back to factory defaults?')) {
                    resetToDefaults();
                    showToast('Portfolio reset to initial defaults!', 'info');
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors text-xs font-mono font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Form Modal for Add / Edit */}
      <ProjectFormModal
        isOpen={isModalOpen}
        projectToEdit={editingProject}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
}
