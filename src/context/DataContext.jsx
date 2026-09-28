import React, { createContext, useContext, useState, useEffect } from 'react';
import initialProjects, { getAllCategories as getInitialCategories } from '../data/projects.js';
import initialSiteConfig from '../config/site.js';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  PROJECTS: 'alfaiz_portfolio_projects_v1',
  SITE_CONFIG: 'alfaiz_portfolio_site_config_v1',
  PRIVACY: 'alfaiz_portfolio_privacy_v1',
  AUTH: 'alfaiz_portfolio_admin_auth_v1',
  PASSWORD: 'alfaiz_portfolio_admin_pwd_v1'
};

const DEFAULT_PRIVACY = {
  showEmail: true,
  showPhone: false,
  phoneNumber: '+91 (Provided upon request)',
  showResume: false,
  showGithub: true,
  showLinkedin: true,
  allowDirectContact: true
};

const DEFAULT_PASSWORD = 'alfaiz@2026';

export function DataProvider({ children }) {
  // 1. Projects State
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read projects from localStorage:', e);
    }
    return initialProjects;
  });

  // 2. Site Configuration State
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
      if (saved) return { ...initialSiteConfig, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read site config from localStorage:', e);
    }
    return initialSiteConfig;
  });

  // 3. Privacy & Permission Controls State
  const [privacySettings, setPrivacySettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRIVACY);
      if (saved) return { ...DEFAULT_PRIVACY, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read privacy settings from localStorage:', e);
    }
    return DEFAULT_PRIVACY;
  });

  // 4. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PASSWORD) || DEFAULT_PASSWORD;
    } catch (e) {
      return DEFAULT_PASSWORD;
    }
  });

  // Sync to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to save projects to localStorage:', e);
    }
  }, [projects]);

  // Sync to localStorage whenever siteConfig changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(siteConfig));
    } catch (e) {
      console.warn('Failed to save siteConfig to localStorage:', e);
    }
  }, [siteConfig]);

  // Sync to localStorage whenever privacySettings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRIVACY, JSON.stringify(privacySettings));
    } catch (e) {
      console.warn('Failed to save privacySettings to localStorage:', e);
    }
  }, [privacySettings]);

  // Try fetching from server API if available on startup, with fallback to static JSON
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.ok ? res.json() : fetch('/data/projects.json').then(r => r.ok ? r.json() : null))
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Local mode or static preview, graceful fallback
      });

    fetch('/api/site-config')
      .then(res => res.ok ? res.json() : fetch('/config/site-config.json').then(r => r.ok ? r.json() : null))
      .then(data => {
        if (data && typeof data === 'object') {
          setSiteConfig(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});

    fetch('/api/privacy')
      .then(res => res.ok ? res.json() : fetch('/config/privacy.json').then(r => r.ok ? r.json() : null))
      .then(data => {
        if (data && typeof data === 'object') {
          setPrivacySettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  // Helper: Persist to Server if server.js API is live
  const syncServer = async (endpoint, method, payload) => {
    try {
      await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      // Offline or static fallback
    }
  };

  // --- PROJECT MANAGEMENT ACTIONS ---

  const addProject = (newProject) => {
    const slug = newProject.slug || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const projectWithId = {
      ...newProject,
      id: newProject.id || slug,
      slug: slug,
      date: newProject.date || String(new Date().getFullYear()),
      featured: Boolean(newProject.featured)
    };

    setProjects(prev => [projectWithId, ...prev]);
    syncServer('/api/projects', 'POST', projectWithId);
    return projectWithId;
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id || p.slug === id) {
          const updated = { ...p, ...updatedFields };
          syncServer(`/api/projects/${id}`, 'PUT', updated);
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id && p.slug !== id));
    syncServer(`/api/projects/${id}`, 'DELETE', { id });
  };

  const toggleFeatured = (id) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id || p.slug === id) {
          const updated = { ...p, featured: !p.featured };
          syncServer(`/api/projects/${id}`, 'PUT', updated);
          return updated;
        }
        return p;
      })
    );
  };

  const getProjectBySlug = (slug) => {
    if (!slug) return null;
    const clean = String(slug).trim().toLowerCase();
    return projects.find(p => (p.slug && p.slug.toLowerCase() === clean) || (p.id && p.id.toLowerCase() === clean)) || null;
  };

  const getFeaturedProjects = () => {
    return projects.filter(p => Boolean(p.featured));
  };

  const getAllCategories = () => {
    const predefined = [
      'All',
      'Web Development',
      'College Project',
      'Hackathon',
      'Python',
      'AI/ML',
      'C/C++',
      'Database',
      'Other'
    ];
    const fromData = projects.map(p => p.category).filter(Boolean);
    return Array.from(new Set([...predefined, ...fromData]));
  };

  // --- SITE CONFIG ACTIONS ---

  const updateSiteConfig = (fields) => {
    setSiteConfig(prev => {
      const next = { ...prev, ...fields };
      syncServer('/api/site-config', 'POST', next);
      return next;
    });
  };

  // --- PRIVACY ACTIONS ---

  const updatePrivacySettings = (fields) => {
    setPrivacySettings(prev => {
      const next = { ...prev, ...fields };
      syncServer('/api/privacy', 'POST', next);
      return next;
    });
  };

  // --- ADMIN AUTH ACTIONS ---

  const adminLogin = (inputPassword) => {
    if (inputPassword === adminPassword) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      setIsAdminAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Incorrect passcode. Access denied.' };
  };

  const adminLogout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    setIsAdminAuthenticated(false);
  };

  const changeAdminPassword = (currentPassword, newPassword) => {
    if (currentPassword !== adminPassword) {
      return { success: false, error: 'Current passcode is incorrect.' };
    }
    if (!newPassword || newPassword.trim().length < 4) {
      return { success: false, error: 'New passcode must be at least 4 characters.' };
    }
    const clean = newPassword.trim();
    localStorage.setItem(STORAGE_KEYS.PASSWORD, clean);
    setAdminPassword(clean);
    return { success: true };
  };

  // Reset to original factory defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SITE_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PRIVACY);
    localStorage.removeItem(STORAGE_KEYS.PASSWORD);
    setProjects(initialProjects);
    setSiteConfig(initialSiteConfig);
    setPrivacySettings(DEFAULT_PRIVACY);
    setAdminPassword(DEFAULT_PASSWORD);
  };

  const value = {
    // Projects
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    getProjectBySlug,
    getFeaturedProjects,
    getAllCategories,

    // Site Config
    siteConfig,
    updateSiteConfig,

    // Privacy Controls
    privacySettings,
    updatePrivacySettings,

    // Auth
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    changeAdminPassword,
    resetToDefaults
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
