'use client';

import { useState } from 'react';
import Header from '@/app/Component/Header';
import Footer from '@/app/Component/Home/footer';
import JsonLd from '@/app/Component/SEO/JsonLd';
import { templateConfigs } from '@/app/Component/PortfolioTemplates/templateConfigs';
import TemplateMiniPreview from '@/app/Component/PortfolioTemplates/TemplateMiniPreview';
import Link from 'next/link';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Minimal', 'Developer', 'Creative', 'Professional', 'Modern', 'Bold'];

  const filteredTemplates = templateConfigs.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://resuvix.com" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://resuvix.com/Profolio" },
      { "@type": "ListItem", "position": 3, "name": "Templates", "item": "https://resuvix.com/Profolio/tempelate" }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Header />
      <main className="flex-grow flex flex-col w-full px-4 sm:px-6 md:px-12 lg:px-16 py-12 bg-slate-50 min-h-screen">
        {/* Header Title Section */}
        <header className="mb-10 max-w-4xl pt-16">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
            25 Master Live Templates
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
            Select a Portfolio Architecture
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl leading-relaxed">
            Curated live-rendered portfolio layouts. Inspect proportionally scaled live previews with zero image stretching.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-start md:items-center justify-between sticky top-16 z-30 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 25 live templates..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border-0 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
            />
          </div>

          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 25 Live-Scaled Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {filteredTemplates.map((template) => (
            <article
              key={template.id}
              className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full"
            >
              {/* Live Proportionally Scaled Template Thumbnail Container */}
              <div className="h-64 p-3 relative overflow-hidden bg-slate-900 shrink-0">
                <TemplateMiniPreview templateId={template.id} />

                {/* Top Overlay Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20 pointer-events-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-950/80 text-emerald-400 border border-slate-700/80 backdrop-blur-md">
                    {template.badge || template.category}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-slate-900 backdrop-blur-md shadow-sm">
                    📱 Live Scaled
                  </span>
                </div>

                {/* Hover Quick Action Buttons Overlay */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-30 p-4">
                  <Link
                    href={`/Profolio/ProfolioEditor?template=${template.id}`}
                    className="w-full max-w-[200px] text-center px-6 py-3 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl transition-all hover:scale-105"
                  >
                    Use Template →
                  </Link>
                  <Link
                    href={`/p/demo?template=${template.id}`}
                    target="_blank"
                    className="w-full max-w-[200px] text-center px-6 py-2.5 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md transition-all"
                  >
                    Live Preview ↗
                  </Link>
                </div>
              </div>

              {/* Card Information Body */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                      {template.name}
                    </h3>
                    
                    {/* Color Palette Swatches */}
                    <div className="flex items-center gap-1 shrink-0" title="Template Palette">
                      {template.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-6">
                    {template.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">{template.category}</span>
                  <Link
                    href={`/Profolio/ProfolioEditor?template=${template.id}`}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                  >
                    <span>Use Template</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}