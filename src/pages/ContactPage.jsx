import React, { useEffect } from 'react';
import Contact from '../components/Contact.jsx';
import { siteConfig } from '../config/site.js';

export default function ContactPage() {
  useEffect(() => {
    document.title = `Contact | ${siteConfig.name} — Developer Portfolio`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      <Contact />
    </div>
  );
}
