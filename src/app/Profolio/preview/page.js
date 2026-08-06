'use client';

import { useEffect, useState, useMemo } from 'react';
import TemplateRenderer from '@/app/Component/PortfolioTemplates/TemplateRenderer';
import { defaultPortfolio } from '@/app/context/PortfolioContext';
import PreviewOverlayManager from '@/app/Component/PortfolioEditor/PreviewOverlayManager';
// PDF libraries are loaded lazily on demand — no static import needed

export default function PreviewIframe() {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [templateId, setTemplateId] = useState('minimalist');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Notify parent that iframe is ready to receive data
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');

    const handleMessage = (event) => {
      if (event.data?.type === 'UPDATE_PORTFOLIO') {
        if (event.data.portfolio) setPortfolio(event.data.portfolio);
        if (event.data.templateId) setTemplateId(event.data.templateId);
      } else if (event.data?.type === 'EXPORT_PDF') {
        // Hide editor overlays before capture
        const overlays = document.querySelectorAll('.preview-overlay-box, .style-editor-panel, .context-menu, .preview-overlay-actions, textarea');
        overlays.forEach(el => { if (el) el.style.opacity = '0'; });

        const restore = () => overlays.forEach(el => { if (el) el.style.opacity = '1'; });

        // Run async export after a paint tick
        setTimeout(async () => {
          const el = document.querySelector('.portfolio-template') || document.body;
          const prevStyles = { zoom: el.style.zoom, width: el.style.width, minWidth: el.style.minWidth, overflow: el.style.overflow };

          try {
            // Force A4 width so html2canvas captures full layout
            el.style.zoom = '1';
            el.style.width = '794px';
            el.style.minWidth = '794px';
            el.style.overflow = 'visible';

            await new Promise(r => setTimeout(r, 120));

            // Dynamically import heavy libraries only when needed
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const canvas = await html2canvas(el, {
              scale: 2,
              useCORS: true,
              backgroundColor: '#ffffff',
              logging: false,
              width: el.scrollWidth,
              height: el.scrollHeight,
              windowWidth: el.scrollWidth,
            });

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
            const pageWidth  = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const pageHeightPx = (canvas.width * pageHeight) / pageWidth;

            let yOffset = 0, pageIndex = 0;
            while (yOffset < canvas.height) {
              if (pageIndex > 0) pdf.addPage();
              const sliceH = Math.min(pageHeightPx, canvas.height - yOffset);
              const sc = document.createElement('canvas');
              sc.width = canvas.width; sc.height = sliceH;
              sc.getContext('2d').drawImage(canvas, 0, yOffset, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
              pdf.addImage(sc.toDataURL('image/png'), 'PNG', 0, 0, pageWidth, (sliceH * pageWidth) / canvas.width, undefined, 'FAST');
              yOffset += pageHeightPx;
              pageIndex++;
            }

            pdf.save('portfolio.pdf');
          } catch (err) {
            console.error('Portfolio PDF export failed:', err);
          } finally {
            el.style.zoom = prevStyles.zoom;
            el.style.width = prevStyles.width;
            el.style.minWidth = prevStyles.minWidth;
            el.style.overflow = prevStyles.overflow;
            restore();
          }
        }, 100);
      }
    };

    window.addEventListener('message', handleMessage);
    setIsReady(true);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Generate CSS string from customStyles object
  const injectedCSS = useMemo(() => {
    const customStyles = portfolio.customStyles || {};
    let css = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);} }
      @keyframes pulse { 0% {transform: scale(1);} 50% {transform: scale(1.05);} 100% {transform: scale(1);} }
    `;
    
    Object.entries(customStyles).forEach(([selector, styles]) => {
      css += `${selector} {\n`;
      Object.entries(styles).forEach(([prop, val]) => {
        // Convert camelCase to kebab-case
        const kebab = prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
        css += `  ${kebab}: ${val} !important;\n`;
      });
      css += `}\n`;
    });
    return css;
  }, [portfolio.customStyles]);

  if (!isReady) return null;

  return (
    <div className="bg-white min-h-screen relative">
      <style dangerouslySetInnerHTML={{ __html: injectedCSS }} />
      <PreviewOverlayManager />
      <TemplateRenderer portfolio={portfolio} templateId={templateId} />
    </div>
  );
}
