import React, { useEffect } from 'react';
import Skills from '../components/Skills.jsx';
import { siteConfig } from '../config/site.js';

export default function SkillsPage() {
  useEffect(() => {
    document.title = `Skills & Technologies | ${siteConfig.name} — Developer Portfolio`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      <Skills isPreview={false} />
    </div>
  );
}
