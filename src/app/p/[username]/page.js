'use client';

import { useEffect, useState } from 'react';
import TemplateRenderer from '@/app/Component/PortfolioTemplates/TemplateRenderer';
import { defaultPortfolio } from '@/app/context/PortfolioContext';
import Link from 'next/link';

export default function PublishedPortfolioPage() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('resuvix-portfolio');
      if (saved) {
        setPortfolio(JSON.parse(saved));
      } else {
        setPortfolio(defaultPortfolio);
      }
    } catch {
      setPortfolio(defaultPortfolio);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  const p = portfolio || defaultPortfolio;
  const fullName = `${p.personalInfo?.firstName || ''} ${p.personalInfo?.lastName || ''}`.trim() || 'Professional Portfolio';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    jobTitle: p.personalInfo?.title || '',
    email: p.personalInfo?.email || '',
    telephone: p.personalInfo?.phone || '',
    address: p.personalInfo?.location || '',
    url: p.personalInfo?.website || '',
    description: p.about?.bio || p.personalInfo?.tagline || '',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        <TemplateRenderer portfolio={p} templateId={p.templateId || 'minimalist'} />

        {/* Floating Resuvix Branding Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link
            href="/Profolio"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-bold shadow-xl backdrop-blur-md hover:bg-slate-800 transition-all border border-slate-700 hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Built with Resuvix
          </Link>
        </div>
      </main>
    </>
  );
}
