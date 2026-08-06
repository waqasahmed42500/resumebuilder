'use client';

import React from 'react';
import TemplateRenderer from './TemplateRenderer';
import { defaultPortfolio } from '@/app/context/PortfolioContext';

export default function TemplateMiniPreview({ templateId, customPortfolio }) {
  const portfolio = customPortfolio || defaultPortfolio;

  return (
    <div className="w-full h-[220px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col shadow-xl select-none relative group/mini">
      {/* Mac Browser Header Chrome */}
      <div className="h-7 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block"></span>
        </div>
        <div className="text-[9px] font-mono text-slate-400 truncate max-w-[140px]">
          resuvix.com/p/{templateId}
        </div>
        <div className="w-4"></div>
      </div>

      {/* Fixed Dimension 850x550 Scaled Viewport Container */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-900">
        <div
          className="w-[850px] h-[550px] origin-top-left pointer-events-none absolute top-0 left-0 bg-white"
          style={{ transform: 'scale(0.36)' }}
        >
          <TemplateRenderer portfolio={portfolio} templateId={templateId} />
        </div>
      </div>
    </div>
  );
}
