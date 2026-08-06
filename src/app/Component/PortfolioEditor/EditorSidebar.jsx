'use client';

import { useState } from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import { 
  HiUser, HiDocumentText, HiLightningBolt, HiBriefcase, 
  HiAcademicCap, HiCube, HiCog, HiChatAlt2, 
  HiBadgeCheck, HiMail, HiColorSwatch, HiSearch, 
  HiLockClosed, HiLockOpen, HiTrash, HiCheck, HiEye, HiEyeOff, HiLink
} from 'react-icons/hi';

export default function EditorSidebar({ activeSection, onSectionChange, mobileSidebarOpen, onCloseMobileSidebar }) {
  const { portfolio, toggleSection, resetPortfolio } = usePortfolio();
  const [isPinned, setIsPinned] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'personalInfo', label: 'Personal Info', icon: HiUser },
    { id: 'about', label: 'About', icon: HiDocumentText },
    { id: 'skills', label: 'Skills', icon: HiLightningBolt },
    { id: 'experience', label: 'Experience', icon: HiBriefcase },
    { id: 'education', label: 'Education', icon: HiAcademicCap },
    { id: 'projects', label: 'Projects', icon: HiCube },
    { id: 'services', label: 'Services', icon: HiCog },
    { id: 'testimonials', label: 'Testimonials', icon: HiChatAlt2 },
    { id: 'certifications', label: 'Certifications & Awards', icon: HiBadgeCheck },
    { id: 'contact', label: 'Contact & Socials', icon: HiMail },
    { id: 'theme', label: 'Theme & Fonts', icon: HiColorSwatch },
    { id: 'footer', label: 'Footer Links', icon: HiLink },
  ];

  const checkCompletion = (id) => {
    switch (id) {
      case 'personalInfo': return Boolean(portfolio.personalInfo?.firstName && portfolio.personalInfo?.title);
      case 'about': return Boolean(portfolio.about?.bio);
      case 'skills': return Boolean(portfolio.skills?.length > 0);
      case 'experience': return Boolean(portfolio.experience?.length > 0);
      case 'education': return Boolean(portfolio.education?.length > 0);
      case 'projects': return Boolean(portfolio.projects?.length > 0);
      case 'services': return Boolean(portfolio.services?.length > 0);
      case 'testimonials': return Boolean(portfolio.testimonials?.length > 0);
      case 'certifications': return Boolean(portfolio.certifications?.length > 0 || portfolio.awards?.length > 0);
      case 'contact': return Boolean(portfolio.personalInfo?.email || portfolio.socialLinks?.github);
      case 'theme': return true;
      case 'footer': return true;
      default: return false;
    }
  };

  const completedCount = sections.filter((s) => checkCompletion(s.id)).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your portfolio? All custom data will be cleared.')) {
      resetPortfolio();
    }
  };

  const filteredSections = sections.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden ${
          mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onCloseMobileSidebar}
      />

      {/* Main Sidebar Drawer (Desktop hover-expand / Mobile drawer) */}
      <aside
        className={`editor-sidebar group fixed left-0 top-14 bottom-0 z-40 flex flex-col bg-slate-50 border-r border-slate-300 shadow-xl transition-all duration-300 ease-in-out select-none overflow-x-hidden ${
          mobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        } ${isPinned ? 'md:w-60' : 'md:w-[72px] md:hover:w-60'}`}
      >
        {/* Top Header: Completion Ring + Title + Pin */}
        <div className="p-3 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${isPinned || mobileSidebarOpen ? 'w-full' : 'group-hover:w-full'}`}>
              <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
                <svg className="h-10 w-10 -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="3.5" fill="none" />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    fill="none"
                    strokeDasharray={100}
                    strokeDashoffset={100 - (progressPercent / 100) * 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-800">
                  {progressPercent}%
                </span>
              </div>

              <div className={`truncate ${isPinned || mobileSidebarOpen ? 'block' : 'hidden group-hover:block'}`}>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Progress</p>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {portfolio.personalInfo?.firstName ? `${portfolio.personalInfo.firstName}'s Portfolio` : 'My Portfolio'}
                </h4>
              </div>
            </div>

            {/* Pin Sidebar Toggle (Desktop Only) */}
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0 hidden md:block ${
                isPinned ? 'block' : 'hidden group-hover:block'
              }`}
              title={isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
            >
              {isPinned ? <HiLockClosed className="w-4 h-4 text-emerald-600" /> : <HiLockOpen className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Filter Input */}
        <div className={`p-2.5 border-b border-slate-200 bg-white ${isPinned || mobileSidebarOpen ? 'block' : 'hidden group-hover:block'}`}>
          <div className="relative">
            <HiSearch className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Navigation Section List */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
          {filteredSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isVisible = portfolio.sectionsVisible?.[section.id] !== false;
            const isDone = checkCompletion(section.id);

            return (
              <div key={section.id} className="relative flex items-center group/item">
                <button
                  onClick={() => {
                    onSectionChange(section.id);
                    if (mobileSidebarOpen) onCloseMobileSidebar();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                  title={section.label}
                >
                  <div className="relative shrink-0 flex items-center justify-center w-5 h-5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {isDone && !isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
                    )}
                  </div>

                  <span className={`truncate text-left ${isPinned || mobileSidebarOpen ? 'inline-block' : 'hidden group-hover:inline-block'}`}>
                    {section.label}
                  </span>

                  {isDone && (
                    <span
                      className={`ml-auto ${isPinned || mobileSidebarOpen ? 'inline-block' : 'hidden group-hover:inline-block'} ${
                        isActive ? 'text-white' : 'text-emerald-600'
                      }`}
                    >
                      <HiCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>

                {/* Eye Hide/Show Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSection(section.id);
                  }}
                  className={`p-1.5 text-slate-400 hover:text-slate-800 transition-colors rounded-md absolute right-2 ${
                    isPinned || mobileSidebarOpen ? 'flex' : 'hidden group-hover:flex'
                  } ${isVisible ? 'opacity-80' : 'opacity-30'}`}
                  title={isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {isVisible ? <HiEye className="w-3.5 h-3.5" /> : <HiEyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Reset Button */}
        <div className="p-2 border-t border-slate-200 bg-white">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all border border-rose-200"
            title="Reset Portfolio"
          >
            <HiTrash className="w-4 h-4 shrink-0" />
            <span className={`${isPinned || mobileSidebarOpen ? 'inline' : 'hidden group-hover:inline'} truncate`}>
              Reset Portfolio
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
