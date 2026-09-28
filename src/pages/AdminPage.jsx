import React, { useEffect } from 'react';
import { useData } from '../context/DataContext.jsx';
import AdminLogin from '../components/AdminLogin.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';

export default function AdminPage() {
  const { isAdminAuthenticated, siteConfig } = useData();

  useEffect(() => {
    document.title = `Admin Portal | ${siteConfig.name} Portfolio`;
    window.scrollTo(0, 0);
  }, [siteConfig]);

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
