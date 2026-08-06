'use client';

import React, { useState } from 'react';
import { getTemplateById } from './templateConfigs';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import ProjectsSection from './sections/ProjectsSection';
import ServicesSection from './sections/ServicesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import { HiMenu, HiX } from 'react-icons/hi';

const SECTION_COMPONENTS = {
  hero: HeroSection,
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  education: EducationSection,
  projects: ProjectsSection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  certifications: CertificationsSection,
  contact: ContactSection,
};

export default function TemplateRenderer({ portfolio, templateId }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const template = getTemplateById(templateId || portfolio.templateId || 'minimal-white');
  const theme = portfolio.theme || {};

  const styleProps = {
    '--p-primary': theme.primaryColor || '#3b82f6',
    '--p-accent': theme.accentColor || '#10b981',
    '--p-bg': theme.backgroundColor || (template.variant === 'dark' ? '#0f172a' : '#ffffff'),
    '--p-text': theme.textColor || (template.variant === 'dark' ? '#f8fafc' : '#0f172a'),
    fontFamily: theme.fontFamily || 'Inter, system-ui, sans-serif',
  };

  const sectionsOrder = portfolio.sectionsOrder || [
    'hero', 'about', 'skills', 'experience', 'education', 
    'projects', 'services', 'testimonials', 'certifications', 'contact'
  ];
  
  const sectionsVisible = portfolio.sectionsVisible || {};

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ].filter((item) => sectionsVisible[item.id] !== false);

  const fullName = `${portfolio.personalInfo?.firstName || ''} ${portfolio.personalInfo?.lastName || ''}`.trim() || 'Portfolio';

  return (
    <div 
      className={`portfolio-template template-${template.id} ${template.styleClass} variant-${template.variant} layout-${template.layout} min-h-screen w-full overflow-x-hidden relative`}
      style={styleProps}
    >
      <style>{`
        .portfolio-template {
          background-color: var(--p-bg);
          color: var(--p-text);
        }
        .template-minimal-white {
          background-color: #ffffff !important;
          color: #0f172a !important;
        }
        .template-dark-terminal {
          background-color: #0d1117 !important;
          color: #c9d1d9 !important;
          font-family: 'Fira Code', monospace, Courier !important;
        }
        .template-creative-designer {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%) !important;
          color: #ffffff !important;
        }
        .template-photographer {
          background-color: #050505 !important;
          color: #e5e5e5 !important;
        }
        .template-glass {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
          color: #ffffff !important;
        }
        .template-luxury {
          background-color: #09090b !important;
          color: #f4f4f5 !important;
          font-family: 'Playfair Display', Georgia, serif !important;
        }
        .template-architect {
          background-color: #0c2340 !important;
          color: #e2e8f0 !important;
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0);
          background-size: 24px 24px;
        }
        .template-ai-engineer {
          background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #090d16 100%) !important;
          color: #f1f5f9 !important;
        }
      `}</style>

      {/* Sticky Responsive Template Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="font-extrabold text-base sm:text-lg tracking-tight truncate max-w-[200px] sm:max-w-xs">
            {fullName}
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-emerald-500 transition-colors opacity-80 hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-4 text-sm font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>
      
      {/* Sections List */}
      <main className="w-full overflow-x-hidden">
        {sectionsOrder.map((sectionId) => {
          if (sectionsVisible[sectionId] === false) return null;

          const SectionComponent = SECTION_COMPONENTS[sectionId];
          if (!SectionComponent) return null;

          let sectionData = portfolio[sectionId];
          if (sectionId === 'hero') sectionData = portfolio.personalInfo;
          if (sectionId === 'certifications') {
            sectionData = {
              certifications: portfolio.certifications || [],
              awards: portfolio.awards || []
            };
          }
          if (sectionId === 'contact') {
            sectionData = {
              contact: portfolio.contact || {},
              socialLinks: portfolio.socialLinks || {},
              personalInfo: portfolio.personalInfo || {}
            };
          }

          return (
            <SectionComponent
              key={sectionId}
              data={sectionData}
              theme={theme}
              variant={template.variant}
              templateId={template.id}
              sectionId={sectionId}
            />
          );
        })}
      </main>

      <FooterSection 
        data={portfolio.footer || { showFooter: true }}
        theme={theme}
        personalInfo={portfolio.personalInfo}
      />
    </div>
  );
}
