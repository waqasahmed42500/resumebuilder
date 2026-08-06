'use client';

import { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import Link from 'next/link';
import { 
  HiTemplate, HiDownload, HiGlobe, HiShare, 
  HiSun, HiMoon, HiViewGrid, HiPencil, HiEye, 
  HiMenu, HiX, HiReply, HiDotsHorizontal
} from 'react-icons/hi';

export default function EditorToolbar({ 
  editorMode, 
  onEditorModeChange, 
  onOpenTemplateModal, 
  onOpenPublishModal, 
  onExportPDF,
  isExportingPDF,
  previewDarkMode,
  onTogglePreviewDarkMode,
  onToggleMobileSidebar,
  mobileSidebarOpen
}) {
  const { portfolio, undo, redo, canUndo, canRedo } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // Close more menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const title = mounted && portfolio.personalInfo?.firstName 
    ? `${portfolio.personalInfo.firstName}'s Portfolio` 
    : 'Portfolio Builder';

  const handleCopyShareLink = () => {
    const url = window.location.origin + '/p/' + (portfolio.slug || 'demo');
    navigator.clipboard.writeText(url);
    setCopied(true);
    setMoreOpen(false);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-slate-50/90 border-b border-slate-200/80 backdrop-blur-md z-40 flex items-center justify-between px-4 sm:px-6 text-slate-900 select-none shadow-sm">

      {/* ── LEFT: Logo + Mobile Toggle + Title + Undo/Redo ── */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-200/80 md:hidden transition-colors"
          title="Toggle Navigation Menu"
        >
          {mobileSidebarOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <Link href="/" className="shrink-0 text-base sm:text-lg font-extrabold text-slate-900">
          Resu<span className="text-sky-600">vix</span>
          {/* "Portfolio" badge — show on lg+, hide on md to save space */}
          <span className="ml-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline md:hidden lg:inline-block">
            Portfolio
          </span>
        </Link>

        <div className="h-4 w-px bg-slate-300 hidden md:block" />

        {/* Title + Save Indicator */}
        <div className="flex items-center gap-2 max-w-[150px] sm:max-w-xs truncate">
          {/* Title text: visible on sm+, hidden only on md, visible again on lg+ */}
          <span className="text-xs font-bold text-slate-800 truncate hidden sm:inline md:hidden lg:inline">{title}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Saved
          </span>
        </div>

        {/* Undo / Redo */}
        <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 pl-3 ml-1">
          <button 
            onClick={undo} 
            disabled={!canUndo}
            className={`p-1.5 rounded-lg transition-colors ${canUndo ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800' : 'text-slate-300 cursor-not-allowed'}`}
            title="Undo (Ctrl+Z)"
          >
            <HiReply className="w-4 h-4" />
          </button>
          <button 
            onClick={redo} 
            disabled={!canRedo}
            className={`p-1.5 rounded-lg transition-colors ${canRedo ? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800' : 'text-slate-300 cursor-not-allowed'}`}
            title="Redo (Ctrl+Shift+Z)"
          >
            <HiReply className="w-4 h-4 -scale-x-100" />
          </button>
        </div>
      </div>

      {/* ── CENTER: View Mode Switcher ── */}
      <div className="hidden md:flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => onEditorModeChange('split')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            editorMode === 'split' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Split View (Form + Live Preview)"
        >
          <HiViewGrid className="w-3.5 h-3.5 text-emerald-600" />
          {/* Label: hidden on md only, visible on lg+ */}
          <span className="inline md:hidden lg:inline">Split</span>
        </button>

        <button
          onClick={() => onEditorModeChange('form')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            editorMode === 'form' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Form Only (Max Editing Space)"
        >
          <HiPencil className="w-3.5 h-3.5 text-amber-600" />
          <span className="inline md:hidden lg:inline">Form</span>
        </button>

        <button
          onClick={() => onEditorModeChange('preview')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
            editorMode === 'preview' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Focus Mode (Live Preview Only)"
        >
          <HiEye className="w-3.5 h-3.5 text-sky-600" />
          <span className="inline md:hidden lg:inline">Focus</span>
        </button>
      </div>

      {/* ── RIGHT: Action Buttons ── */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Dark Mode Toggle */}
        <button
          onClick={onTogglePreviewDarkMode}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors"
          title={previewDarkMode ? 'Switch Preview to Light' : 'Switch Preview to Dark'}
        >
          {previewDarkMode 
            ? <HiSun className="w-4 h-4 text-amber-500" /> 
            : <HiMoon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* Template Button 
            — icon-only on md (768-1023px)
            — icon + text on lg+ (1024px+) */}
        <button
          onClick={onOpenTemplateModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 shadow-sm transition-all hover:scale-105 active:scale-95"
          title="Select Template"
        >
          <HiTemplate className="w-3.5 h-3.5 text-emerald-600" />
          <span className="inline md:hidden lg:inline">Template</span>
        </button>

        {/* Share Button
            — Hidden on mobile (<768px) 
            — Icon-only on md (768–1023px) with tooltip
            — Icon + "Share" text on lg+ (1024px+) */}
        <div className="relative hidden sm:block">
          <button
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 shadow-sm transition-all"
            title="Copy Shareable Link"
          >
            <HiShare className="w-3.5 h-3.5 text-sky-600" />
            <span className="inline md:hidden lg:inline">Share</span>
          </button>
          {copied && (
            <div className="absolute right-0 top-full mt-2 bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap animate-fadeIn z-50">
              Link Copied!
            </div>
          )}
        </div>

        {/* Export PDF Button */}
        <button
          onClick={onExportPDF}
          disabled={isExportingPDF}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all ${
            isExportingPDF
              ? 'bg-slate-500 cursor-not-allowed opacity-70'
              : 'bg-slate-900 hover:bg-slate-800 hover:scale-105 active:scale-95'
          }`}
          title="Download PDF"
        >
          {isExportingPDF
            ? <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin shrink-0" />
            : <HiDownload className="w-3.5 h-3.5 text-slate-300" />}
          <span className="hidden sm:inline">{isExportingPDF ? 'Generating…' : 'Export PDF'}</span>
        </button>

        {/* Publish Button */}
        <button
          onClick={onOpenPublishModal}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all hover:scale-105 active:scale-95"
          title="Publish Portfolio"
        >
          <HiGlobe className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>

        {/* ⋯ More Menu — mobile only, contains Share */}
        <div className="relative sm:hidden" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-200/80 transition-colors"
            title="More options"
          >
            <HiDotsHorizontal className="w-5 h-5" />
          </button>
          {moreOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden min-w-[160px]">
              <button
                onClick={handleCopyShareLink}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <HiShare className="w-4 h-4 text-sky-600" />
                {copied ? 'Link Copied!' : 'Share Link'}
              </button>
              <button
                onClick={onTogglePreviewDarkMode}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors border-t border-slate-100"
              >
                {previewDarkMode 
                  ? <HiSun className="w-4 h-4 text-amber-500" />
                  : <HiMoon className="w-4 h-4 text-slate-500" />}
                {previewDarkMode ? 'Light Preview' : 'Dark Preview'}
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
