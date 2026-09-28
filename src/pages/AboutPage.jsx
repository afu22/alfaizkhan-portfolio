import React, { useEffect } from 'react';
import About from '../components/About.jsx';
import { siteConfig } from '../config/site.js';

export default function AboutPage() {
  useEffect(() => {
    document.title = `About | ${siteConfig.name} — Developer Portfolio`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      <About isPreview={false} />
    </div>
  );
}
