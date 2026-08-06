'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import EditorSidebar from '@/app/Component/PortfolioEditor/EditorSidebar';
import EditorToolbar from '@/app/Component/PortfolioEditor/EditorToolbar';
import PersonalInfoEditor from '@/app/Component/PortfolioEditor/PersonalInfoEditor';
import AboutEditor from '@/app/Component/PortfolioEditor/AboutEditor';
import SkillsEditor from '@/app/Component/PortfolioEditor/SkillsEditor';
import ExperienceEditor from '@/app/Component/PortfolioEditor/ExperienceEditor';
import EducationEditor from '@/app/Component/PortfolioEditor/EducationEditor';
import ProjectsEditor from '@/app/Component/PortfolioEditor/ProjectsEditor';
import ServicesEditor from '@/app/Component/PortfolioEditor/ServicesEditor';
import TestimonialsEditor from '@/app/Component/PortfolioEditor/TestimonialsEditor';
import CertificationsEditor from '@/app/Component/PortfolioEditor/CertificationsEditor';
import ContactEditor from '@/app/Component/PortfolioEditor/ContactEditor';
import ThemeEditor from '@/app/Component/PortfolioEditor/ThemeEditor';
import FooterEditor from '@/app/Component/PortfolioEditor/FooterEditor';
import dynamic from 'next/dynamic';

const PreviewPanel = dynamic(() => import('@/app/Component/PortfolioEditor/PreviewPanel'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center bg-slate-900"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>
});
import TemplateMiniPreview from '@/app/Component/PortfolioTemplates/TemplateMiniPreview';
import TemplateRenderer from '@/app/Component/PortfolioTemplates/TemplateRenderer';
// PDFExport is handled inline — no static import of heavy libraries needed
import { templateConfigs } from '@/app/Component/PortfolioTemplates/templateConfigs';
import { 
  HiX, HiCheck, HiClipboardCopy, HiExternalLink, 
  HiSparkles, HiPencil, HiEye, HiDesktopComputer, 
  HiDeviceMobile, HiZoomIn, HiZoomOut, HiCheckCircle
} from 'react-icons/hi';
import Link from 'next/link';

// ─── PDF Page Size Configuration ───────────────────────────────────────────
const PAGE_SIZES = {
  a4:     { label: 'A4',     sub: '210 × 297 mm',  jsPDF: 'a4',     portrait: 794,  landscape: 1123 },
  letter: { label: 'Letter', sub: '8.5 × 11 in',   jsPDF: 'letter', portrait: 816,  landscape: 1056 },
  legal:  { label: 'Legal',  sub: '8.5 × 14 in',   jsPDF: 'legal',  portrait: 816,  landscape: 1056 },
  a3:     { label: 'A3',     sub: '297 × 420 mm',  jsPDF: 'a3',     portrait: 1123, landscape: 1587 },
  a5:     { label: 'A5',     sub: '148 × 210 mm',  jsPDF: 'a5',     portrait: 559,  landscape: 794  },
};

export default function PortfolioEditorPage() {
  const { portfolio, setTemplate } = usePortfolio();

  // State controls
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [zoom, setZoom] = useState(100);
  const [editorMode, setEditorMode] = useState('split'); // 'split' | 'form' | 'preview'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewDarkMode, setPreviewDarkMode] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  // PDF Settings Modal
  const [isPDFSettingsOpen, setIsPDFSettingsOpen] = useState(false);
  const [pdfPageSize, setPdfPageSize] = useState('a4');
  const [pdfOrientation, setPdfOrientation] = useState('portrait');
  const [pdfCaptureWidth, setPdfCaptureWidth] = useState(794);

  // Mobile Controls
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'preview'

  // Modals
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [previewingTemplateId, setPreviewingTemplateId] = useState(null); // Full-size inspection modal
  const [inspectionDevice, setInspectionDevice] = useState('desktop');
  const [inspectionZoom, setInspectionZoom] = useState(100);

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishCopied, setPublishCopied] = useState(false);

  // Resizable Form Panel Width (Default: 440px)
  const [formWidth, setFormWidth] = useState(440);
  const [isDragging, setIsDragging] = useState(false);
  const editorContainerRef = useRef(null);
  const exportContainerRef = useRef(null); // ref for the hidden PDF capture div

  // Check URL query parameters for template selection
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const templateParam = searchParams.get('template');
    if (templateParam) {
      setTemplate(templateParam);
    }
  }, [setTemplate]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsTemplateModalOpen(false);
        setPreviewingTemplateId(null);
        setIsPublishModalOpen(false);
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Resizable split handle drag handlers
  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newWidth = Math.min(650, Math.max(340, e.clientX - 72));
      setFormWidth(newWidth);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Open PDF settings modal (called by toolbar button)
  const openPDFSettings = () => {
    if (!isExportingPDF) setIsPDFSettingsOpen(true);
  };

  const handleExportPDF = useCallback(async () => {
    const sizeConfig = PAGE_SIZES[pdfPageSize] || PAGE_SIZES.a4;
    const captureWidth = sizeConfig[pdfOrientation];

    // Close modal, set capture width, show loading
    setIsPDFSettingsOpen(false);
    setPdfCaptureWidth(captureWidth);
    setIsExportingPDF(true);

    try {
      // Wait for React to render the hidden TemplateRenderer at the correct width
      await new Promise(r => setTimeout(r, 1400));

      const el = exportContainerRef.current;
      if (!el) throw new Error('Export container not mounted');

      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const dataUrl = await toPng(el, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: el.scrollWidth,
        height: el.scrollHeight,
        skipFonts: false,
      });

      // Load the PNG into a canvas for A4/Letter/etc. page slicing
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load generated image'));
      });

      const fullCanvas = document.createElement('canvas');
      fullCanvas.width  = img.naturalWidth;
      fullCanvas.height = img.naturalHeight;
      fullCanvas.getContext('2d').drawImage(img, 0, 0);

      if (fullCanvas.width === 0 || fullCanvas.height === 0) {
        throw new Error('Generated image is empty');
      }

      const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: 'pt',
        format: sizeConfig.jsPDF,
      });
      const pageWidth    = pdf.internal.pageSize.getWidth();
      const pageHeight   = pdf.internal.pageSize.getHeight();
      const pageHeightPx = (fullCanvas.width * pageHeight) / pageWidth;

      let yOffset = 0, pageIndex = 0;
      while (yOffset < fullCanvas.height) {
        if (pageIndex > 0) pdf.addPage();
        const sliceH = Math.min(pageHeightPx, fullCanvas.height - yOffset);
        const sc = document.createElement('canvas');
        sc.width  = fullCanvas.width;
        sc.height = sliceH;
        sc.getContext('2d').drawImage(
          fullCanvas,
          0, yOffset, fullCanvas.width, sliceH,
          0, 0,       fullCanvas.width, sliceH
        );
        pdf.addImage(
          sc.toDataURL('image/png'), 'PNG',
          0, 0,
          pageWidth, (sliceH * pageWidth) / fullCanvas.width,
          undefined, 'FAST'
        );
        yOffset += pageHeightPx;
        pageIndex++;
      }

      const name = portfolio.personalInfo?.firstName
        ? `${portfolio.personalInfo.firstName}-portfolio`
        : 'portfolio';
      pdf.save(`${name}.pdf`);
    } catch (err) {
      console.error('Portfolio PDF export failed:', err);
      alert(`PDF export failed: ${err.message}`);
    } finally {
      setIsExportingPDF(false);
    }
  }, [portfolio, pdfPageSize, pdfOrientation]);

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personalInfo': return <PersonalInfoEditor />;
      case 'about': return <AboutEditor />;
      case 'skills': return <SkillsEditor />;
      case 'experience': return <ExperienceEditor />;
      case 'education': return <EducationEditor />;
      case 'projects': return <ProjectsEditor />;
      case 'services': return <ServicesEditor />;
      case 'testimonials': return <TestimonialsEditor />;
      case 'certifications': return <CertificationsEditor />;
      case 'contact': return <ContactEditor />;
      case 'theme': return <ThemeEditor />;
      case 'footer': return <FooterEditor />;
      default: return <PersonalInfoEditor />;
    }
  };

  const currentSlug = portfolio.slug || portfolio.personalInfo?.firstName?.toLowerCase() || 'john-doe';
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/p/${currentSlug}` : `/p/${currentSlug}`;

  const copyPublishUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setPublishCopied(true);
    setTimeout(() => setPublishCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-100 overflow-hidden font-sans select-none">

      {/* PDF Export Loading Overlay */}
      {isExportingPDF && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
          <p className="text-white font-bold text-lg tracking-tight">Generating PDF…</p>
          <p className="text-slate-400 text-sm">This may take a few seconds</p>
        </div>
      )}

      {/* Hidden template container — width driven by selected page size/orientation.
          Rendered inside the React tree so CSS context works. z-index:-1 keeps it behind UI. */}
      {isExportingPDF && (
        <div
          ref={exportContainerRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${pdfCaptureWidth}px`,
            minWidth: `${pdfCaptureWidth}px`,
            background: '#ffffff',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          <TemplateRenderer
            portfolio={portfolio}
            templateId={portfolio.templateId || 'minimalist'}
          />
        </div>
      )}

      {/* PDF Settings Modal */}
      {isPDFSettingsOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Export as PDF</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Choose your page size and orientation</p>
                </div>
                <button
                  onClick={() => setIsPDFSettingsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-6">
              {/* Page Size Selection */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Page Size</p>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(PAGE_SIZES).map(([key, cfg]) => {
                    const isSelected = pdfPageSize === key;
                    // Visual ratio for portrait thumbnail
                    const ratios = { a4: '1/1.41', letter: '1/1.29', legal: '1/1.65', a3: '1/1.41', a5: '1/1.41' };
                    return (
                      <button
                        key={key}
                        onClick={() => setPdfPageSize(key)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {/* Page thumbnail */}
                        <div
                          className={`rounded border-2 ${
                            isSelected ? 'border-emerald-400 bg-emerald-100' : 'border-slate-300 bg-slate-100'
                          }`}
                          style={{
                            width: pdfOrientation === 'portrait' ? '28px' : '40px',
                            height: pdfOrientation === 'portrait' ? '40px' : '28px',
                          }}
                        />
                        <span className={`text-xs font-bold ${
                          isSelected ? 'text-emerald-700' : 'text-slate-600'
                        }`}>{cfg.label}</span>
                        <span className="text-[10px] text-slate-400 text-center leading-tight">{cfg.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Orientation */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Orientation</p>
                <div className="flex gap-3">
                  {[
                    { id: 'portrait',  label: 'Portrait',  w: 28, h: 40 },
                    { id: 'landscape', label: 'Landscape', w: 40, h: 28 },
                  ].map(({ id, label, w, h }) => (
                    <button
                      key={id}
                      onClick={() => setPdfOrientation(id)}
                      className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-2xl border-2 transition-all ${
                        pdfOrientation === id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`rounded shrink-0 border-2 ${
                          pdfOrientation === id ? 'border-emerald-400 bg-emerald-100' : 'border-slate-300 bg-slate-100'
                        }`}
                        style={{ width: `${w}px`, height: `${h}px` }}
                      />
                      <span className={`text-sm font-bold ${
                        pdfOrientation === id ? 'text-emerald-700' : 'text-slate-600'
                      }`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500">Selected format</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    {PAGE_SIZES[pdfPageSize]?.label} &middot; {pdfOrientation === 'portrait' ? 'Portrait' : 'Landscape'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500">Capture width</p>
                  <p className="text-sm font-black text-slate-700 mt-0.5">
                    {PAGE_SIZES[pdfPageSize]?.[pdfOrientation]}px
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 pb-8 flex gap-3">
              <button
                onClick={() => setIsPDFSettingsOpen(false)}
                className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleExportPDF}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
                </svg>
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Header Toolbar */}
      <EditorToolbar
        editorMode={editorMode}
        onEditorModeChange={setEditorMode}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        onExportPDF={openPDFSettings}
        isExportingPDF={isExportingPDF}
        previewDarkMode={previewDarkMode}
        onTogglePreviewDarkMode={() => setPreviewDarkMode(!previewDarkMode)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      {/* Main Workspace Layout */}
      <div 
        ref={editorContainerRef}
        className="flex flex-1 pt-14 pb-14 md:pb-0 overflow-hidden relative"
      >
        {/* Sidebar Nav */}
        <EditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          mobileSidebarOpen={mobileSidebarOpen}
          onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
        />

        {/* Desktop Layout & Mobile Dynamic View
             Layout wrapper is offset by the sidebar width (72px) so the fixed sidebar never overlaps content */}
        <div className="flex flex-1 w-full h-full overflow-hidden md:ml-[72px]">
          {/* Form Panel
               — xl+ (>=1280px): uses draggable pixel formWidth via inline style
               — lg  (1024–1279px): CSS 42% of remaining space
               — md  (768–1023px):  CSS 45% of remaining space  */}
          <div
            style={{
              width: typeof window !== 'undefined' && window.innerWidth >= 1280
                ? (editorMode === 'form' ? '100%' : `${formWidth}px`)
                : undefined
            }}
            className={`shrink-0 overflow-y-auto bg-white border-r border-slate-200 p-4 sm:p-6 editor-panel transition-all ${
              mobileTab === 'form' || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 'block' : 'hidden md:block'
            } ${
              editorMode === 'preview' ? 'hidden' : ''
            } ${
              editorMode === 'form'
                ? 'w-full mx-auto max-w-3xl border-x shadow-xl'
                : editorMode === 'split'
                  ? 'w-full md:w-[45%] lg:w-[42%]'
                  : ''
            }`}
          >
            {renderActiveForm()}
          </div>

          {/* Draggable Resizable Split Divider — only active on xl+ where the pixel formWidth is applied */}
          {editorMode === 'split' && (
            <div
              onMouseDown={handleMouseDown}
              className={`w-1.5 hover:w-2 bg-slate-200 hover:bg-emerald-500 cursor-col-resize transition-all z-20 shrink-0 hidden xl:block ${
                isDragging ? 'bg-emerald-500 w-2' : ''
              }`}
              title="Drag to resize panels"
            />
          )}

          {/* Live Preview Panel — flex-1 takes all remaining space */}
          <div
            className={`flex-1 bg-slate-900 overflow-hidden relative h-full min-w-0 ${
              mobileTab === 'preview' ? 'block w-full' : 'hidden md:block'
            } ${editorMode === 'form' ? 'hidden' : ''}`}
          >
            <PreviewPanel
              device={previewDevice}
              onDeviceChange={setPreviewDevice}
              zoom={zoom}
              onZoomChange={setZoom}
              template={portfolio.templateId}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              previewDarkMode={previewDarkMode}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>
      </div>

      {/* Mobile Floating Bottom Navigation Switcher */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-slate-200 z-30 flex items-center justify-around px-4 shadow-lg">
        <button
          onClick={() => setMobileTab('form')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            mobileTab === 'form' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HiPencil className="w-4 h-4 text-amber-500" />
          <span>Edit Form</span>
        </button>

        <button
          onClick={() => setMobileTab('preview')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            mobileTab === 'preview' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HiEye className="w-4 h-4" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Fullscreen Preview Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-4 px-4 text-white">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-bold">Fullscreen Preview Mode (Press ESC to exit)</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-white">
            <PreviewPanel
              device="desktop"
              onDeviceChange={() => {}}
              zoom={100}
              onZoomChange={() => {}}
              template={portfolio.templateId}
              isFullscreen={true}
              onToggleFullscreen={() => setIsFullscreen(false)}
              previewDarkMode={false}
            />
          </div>
        </div>
      )}

      {/* Live Template Picker Gallery Modal */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-6xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden text-white">
            {/* Modal Top Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <HiSparkles className="text-emerald-400" />
                  Select a Live Portfolio Template
                </h3>
                <p className="text-xs text-slate-400 mt-1">25 recruiter-approved layouts with live preview inspection</p>
              </div>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* 25 Templates Grid Container */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 custom-scrollbar flex-1 bg-slate-950">
              {templateConfigs.map((tpl) => {
                const isSelected = portfolio.templateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    className={`rounded-3xl border overflow-hidden bg-slate-900 flex flex-col justify-between shadow-xl transition-all duration-300 min-h-[320px] ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/50 shadow-emerald-500/10'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Fixed Height Miniature Browser Preview */}
                    <div className="h-[220px] w-full relative overflow-hidden bg-slate-950 p-2 group shrink-0">
                      <TemplateMiniPreview templateId={tpl.id} />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-950/90 text-emerald-400 border border-slate-700">
                          {tpl.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 flex items-center gap-1">
                            <HiCheckCircle className="w-3 h-3" /> Selected
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay Buttons */}
                      <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm z-30 p-4">
                        <button
                          onClick={() => {
                            setTemplate(tpl.id);
                            setIsTemplateModalOpen(false);
                          }}
                          className="w-full max-w-[180px] text-center px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl transition-all hover:scale-105"
                        >
                          Use Template
                        </button>
                        <button
                          onClick={() => setPreviewingTemplateId(tpl.id)}
                          className="w-full max-w-[180px] text-center px-5 py-2 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-1"
                        >
                          <HiEye className="w-3.5 h-3.5" /> Full Inspection
                        </button>
                      </div>
                    </div>

                    {/* Card Footer Info */}
                    <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between flex-1">
                      <div className="truncate pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-black text-white truncate">{tpl.name}</h4>
                          <div className="flex items-center gap-1 shrink-0">
                            {tpl.colors.map((c, i) => (
                              <span key={i} className="w-2.5 h-2.5 rounded-full border border-slate-700" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{tpl.description}</p>
                      </div>

                      <button
                        onClick={() => {
                          setTemplate(tpl.id);
                          setIsTemplateModalOpen(false);
                        }}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Apply'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Full-Size Interactive Template Inspection Modal */}
      {previewingTemplateId && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col p-4 sm:p-6 animate-fadeIn">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 text-white shrink-0 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-base font-black truncate">
                Inspecting: {templateConfigs.find((t) => t.id === previewingTemplateId)?.name}
              </h3>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setInspectionDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  inspectionDevice === 'desktop' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <HiDesktopComputer className="w-4 h-4" /> Desktop
              </button>
              <button
                onClick={() => setInspectionDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  inspectionDevice === 'mobile' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <HiDeviceMobile className="w-4 h-4" /> Mobile
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInspectionZoom(Math.max(50, inspectionZoom - 25))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <HiZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold w-12 text-center">{inspectionZoom}%</span>
              <button
                onClick={() => setInspectionZoom(Math.min(150, inspectionZoom + 25))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <HiZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setTemplate(previewingTemplateId);
                  setPreviewingTemplateId(null);
                  setIsTemplateModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all"
              >
                Use This Template →
              </button>
              <button
                onClick={() => setPreviewingTemplateId(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Inspection Viewport */}
          <div className="flex-1 w-full overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 p-4 flex items-center justify-center">
            <div
              className={`h-full overflow-y-auto custom-scrollbar bg-white rounded-xl shadow-2xl transition-all ${
                inspectionDevice === 'mobile' ? 'w-[375px]' : 'w-full max-w-6xl'
              }`}
              style={{ zoom: `${inspectionZoom}%` }}
            >
              <TemplateRenderer portfolio={portfolio} templateId={previewingTemplateId} />
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setIsPublishModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <HiX className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 text-xl">
              🚀
            </div>

            <h3 className="text-xl font-black mb-2">Publish Your Portfolio</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Your portfolio is ready to go live! Share your personalized link with recruiters, clients, and employers.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-emerald-400 truncate flex-1">{publicUrl}</span>
              <button
                onClick={copyPublishUrl}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
              >
                {publishCopied ? (
                  <>
                    <HiCheck className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <HiClipboardCopy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <Link
                href={publicUrl}
                target="_blank"
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700/60 transition-colors"
              >
                <HiExternalLink className="w-4 h-4" />
                <span>Visit Portfolio</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}