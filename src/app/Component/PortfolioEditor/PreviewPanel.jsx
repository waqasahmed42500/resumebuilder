'use client';

import { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import { 
  HiDesktopComputer, HiDeviceMobile, 
  HiMinusSm, HiPlusSm, HiRefresh, 
  HiSun, HiMoon, HiPrinter, HiArrowsExpand
} from 'react-icons/hi';

export default function PreviewPanel({ 
  device = 'desktop', 
  onDeviceChange,
  zoom = 100,
  onZoomChange,
  template,
  isFullscreen,
  onToggleFullscreen,
  previewDarkMode,
  onSectionChange
}) {
  const { portfolio, setField, updateNested, updateItem, removeItem, addItem, toggleSection, reorderSections, updateStyle, undo, redo } = usePortfolio();
  const previewRef = useRef(null);

  const getDeviceDimensions = () => {
    switch (device) {
      case 'mobile':
        return { width: '375px', height: '667px', label: 'Mobile (375×667)' };
      case 'landscape':
        return { width: '812px', height: '375px', label: 'Mobile Landscape (812×375)' };
      case 'tablet':
        return { width: '768px', height: '1024px', label: 'Tablet (768×1024)' };
      case 'laptop':
        return { width: '1024px', height: '768px', label: 'Laptop (1024×768)' };
      case 'print':
        return { width: '794px', height: '1123px', label: 'Print A4 (794×1123)' };
      case 'desktop':
      default:
        return { width: '100%', height: 'auto', label: 'Desktop (1440px+)' };
    }
  };

  const dims = getDeviceDimensions();
  const currentTemplate = template || portfolio.templateId || 'minimalist';

  const iframeRef = useRef(null);
  const [iframeReady, setIframeReady] = useState(false);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'PREVIEW_READY') {
        setIframeReady(true);
      } else if (e.data?.type === 'INLINE_ACTION') {
        const { action, section, itemId, field, value } = e.data;
        
        switch (action) {
          case 'UNDO':
            if (undo) undo();
            break;
            
          case 'REDO':
            if (redo) redo();
            break;

          case 'OPEN_EDITOR':
            if (onSectionChange && section) onSectionChange(section);
            break;
            
          case 'AUTO_FOCUS':
            if (onSectionChange && section) {
              onSectionChange(section);
              // We could also try to scroll the editor panel if we wanted, but changing the tab is enough for now, 
              // the user requested auto-scroll, so we will emit a custom event that the editor sidebars can listen to.
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('SCROLL_TO_ITEM', { detail: { section, itemId } }));
              }, 100);
            }
            break;
            
          case 'UPDATE_STYLE':
            if (e.data.elementKey && e.data.styles) {
              updateStyle(e.data.elementKey, e.data.styles);
            }
            break;
            
          case 'UPDATE_TEXT':
            if (field) {
              const parts = field.split('.');
              if (parts.length === 2) {
                updateNested(parts[0], parts[1], value);
              } else if (parts.length === 1) {
                setField(parts[0], value);
              }
            }
            break;
            
          case 'DELETE_ITEM':
            if (section && itemId) removeItem(section, itemId);
            break;
            
          case 'DUPLICATE_ITEM':
            if (section && itemId) {
               const itemToCopy = portfolio[section]?.find(item => item.id === itemId);
               if (itemToCopy) {
                 const { id, ...rest } = itemToCopy; // Omit id, addItem assigns new one
                 addItem(section, rest);
               }
            }
            break;
            
          case 'HIDE_SECTION':
            if (section) toggleSection(section);
            break;
            
          case 'MOVE_SECTION_UP':
          case 'MOVE_SECTION_DOWN':
            if (section) {
              const order = [...portfolio.sectionsOrder];
              const index = order.indexOf(section);
              if (action === 'MOVE_SECTION_UP' && index > 0) {
                [order[index - 1], order[index]] = [order[index], order[index - 1]];
                reorderSections(order);
              } else if (action === 'MOVE_SECTION_DOWN' && index < order.length - 1) {
                [order[index + 1], order[index]] = [order[index], order[index + 1]];
                reorderSections(order);
              }
            }
            break;
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSectionChange, portfolio, updateNested, setField, removeItem, addItem, toggleSection, reorderSections, updateStyle, undo, redo]);

  useEffect(() => {
    if (iframeReady && iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({
        type: 'UPDATE_PORTFOLIO',
        portfolio,
        templateId: currentTemplate
      }, '*');
    }
  }, [portfolio, currentTemplate, iframeReady]);

  return (
    <div className={`flex-1 h-full flex flex-col overflow-hidden relative select-none transition-colors duration-300 ${
      previewDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'
    }`}>
      {/* Top Controls Bar: Device Switcher + Zoom + Fullscreen */}
      <div className={`h-11 border-b px-2 md:px-3 flex items-center justify-between z-20 shrink-0 gap-2 ${
        previewDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      } backdrop-blur-md overflow-hidden`}>
        
        {/* Device Switcher — icons only on md, text labels on xl+ */}
        <div className="flex items-center gap-0.5 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium shrink-0">
          {[
            { id: 'desktop',  Icon: HiDesktopComputer, label: 'Desktop',  className: '' },
            { id: 'laptop',   Icon: HiDesktopComputer, label: 'Laptop',   className: 'text-slate-400' },
            { id: 'tablet',   Icon: HiDeviceMobile,    label: 'Tablet',   className: 'text-slate-400' },
            { id: 'mobile',   Icon: HiDeviceMobile,    label: 'Mobile',   className: '' },
            { id: 'print',    Icon: HiPrinter,         label: 'Print',    className: '' },
          ].map(({ id, Icon, label, className: cls }) => (
            <button
              key={id}
              onClick={() => onDeviceChange(id)}
              className={`flex items-center gap-1 px-1.5 md:px-2 py-1 rounded-md transition-all ${
                device === id
                  ? 'bg-white dark:bg-slate-700 font-bold shadow-sm text-emerald-600 dark:text-emerald-400'
                  : `${cls} text-slate-500 hover:text-slate-800 dark:hover:text-slate-200`
              }`}
              title={label}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Center: Device Badge — hidden on md to prevent overflow */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 min-w-0 shrink truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="truncate">{dims.label}</span>
        </div>

        {/* Right: Zoom Controls + Fullscreen */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex items-center gap-0.5 bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
            <button
              onClick={() => onZoomChange(Math.max(50, zoom - 25))}
              className="p-1 hover:text-emerald-600 transition-colors"
              title="Zoom Out"
            >
              <HiMinusSm className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center text-[11px] font-mono font-bold">{zoom}%</span>
            <button
              onClick={() => onZoomChange(Math.min(150, zoom + 25))}
              className="p-1 hover:text-emerald-600 transition-colors"
              title="Zoom In"
            >
              <HiPlusSm className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onZoomChange(100)}
              className="hidden lg:block ml-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
              title="Reset Zoom"
            >
              Reset
            </button>
          </div>

          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            <HiArrowsExpand className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center custom-scrollbar">
        <div
          ref={previewRef}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            width: dims.width,
            maxWidth: '100%',
          }}
          className="shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 border border-slate-300 dark:border-slate-800 bg-white"
        >
          {/* Framer/Webflow Style Browser Header Chrome */}
          <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4">
            {/* Mac Traffic Lights */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-sm"></span>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-lg mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono shadow-inner overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="truncate">
                https://resuvix.com/p/{portfolio.personalInfo?.firstName ? portfolio.personalInfo.firstName.toLowerCase() : 'demo'}
              </span>
            </div>

            {/* Refresh Indicator */}
            <div className="flex items-center gap-2 shrink-0 text-slate-400 text-xs">
              <HiRefresh className="w-3.5 h-3.5 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
            </div>
          </div>

          {/* Actual Live Rendered Portfolio Template via isolated iframe */}
          <div 
            className="w-full bg-white text-slate-900 relative flex-1"
            style={{ height: dims.height === 'auto' ? '800px' : dims.height }}
          >
            <iframe
              ref={iframeRef}
              src="/Profolio/preview"
              className="absolute inset-0 w-full h-full border-0"
              title="Portfolio Live Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
