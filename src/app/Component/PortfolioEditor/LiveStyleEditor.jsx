'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HiX, HiColorSwatch, HiCube, HiArrowsExpand } from 'react-icons/hi';

export default function LiveStyleEditor({ selectedElement, elementData, elementType, initialStyles, onClose, onStyleChange }) {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  
  // Local style state for immediate UI feedback
  const [styles, setStyles] = useState(initialStyles || {});

  useEffect(() => {
    setStyles(initialStyles || {});
  }, [initialStyles, selectedElement]);

  const updateStyle = (prop, value) => {
    const newStyles = { ...styles, [prop]: value };
    if (!value) delete newStyles[prop];
    setStyles(newStyles);
    onStyleChange(newStyles);
  };

  const handlePointerDown = (e) => {
    // Only drag by the header
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      e.target.releasePointerCapture(e.pointerId);
    }
  };

  if (!selectedElement) return null;

  return (
    <div 
      className="fixed z-[10000] w-64 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col font-sans select-none"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={(e) => e.stopPropagation()} // Prevent dropping selection
    >
      {/* Header / Drag Handle */}
      <div className="drag-handle h-10 bg-slate-800 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <HiColorSwatch className="w-4 h-4 text-emerald-400" />
          <span>Style Editor</span>
        </div>
        <button onClick={onClose} aria-label="Close Editor" className="p-1 hover:bg-slate-700 rounded-md text-slate-400 hover:text-white transition-colors">
          <HiX className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar max-h-[60vh] text-xs">
        
        {/* Typography */}
        {(elementType === 'text' || elementType === 'button') && (
          <div className="space-y-3">
            <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Typography</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-300">Size</span>
                <input 
                  type="text" 
                  value={styles.fontSize || ''} 
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  placeholder="e.g. 1.5rem or 24px"
                  className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500 transition-colors"
                />
              </label>
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-300">Weight</span>
                <select 
                  value={styles.fontWeight || ''} 
                  onChange={(e) => updateStyle('fontWeight', e.target.value)}
                  className="w-24 bg-slate-800 border border-slate-700 rounded px-1 py-1 outline-none focus:border-emerald-500"
                >
                  <option value="">Default</option>
                  <option value="400">Normal</option>
                  <option value="500">Medium</option>
                  <option value="600">Semi Bold</option>
                  <option value="700">Bold</option>
                  <option value="900">Black</option>
                </select>
              </label>
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-300">Color</span>
                <div className="flex items-center gap-1">
                  <input 
                    type="color" 
                    value={styles.color || '#ffffff'} 
                    onChange={(e) => updateStyle('color', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-slate-800 border-none p-0"
                  />
                  <input 
                    type="text" 
                    value={styles.color || ''} 
                    onChange={(e) => updateStyle('color', e.target.value)}
                    placeholder="Hex"
                    className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none"
                  />
                </div>
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <label className="space-y-1">
                <span className="text-slate-400 text-[10px]">Line Height</span>
                <input 
                  type="text" 
                  value={styles.lineHeight || ''} 
                  onChange={(e) => updateStyle('lineHeight', e.target.value)}
                  placeholder="1.5"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
                />
              </label>
              <label className="space-y-1">
                <span className="text-slate-400 text-[10px]">Spacing</span>
                <input 
                  type="text" 
                  value={styles.letterSpacing || ''} 
                  onChange={(e) => updateStyle('letterSpacing', e.target.value)}
                  placeholder="0px"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
                />
              </label>
            </div>

            <label className="flex items-center justify-between gap-2 mt-2">
              <span className="text-slate-300">Align</span>
              <div className="flex gap-1 bg-slate-800 rounded p-1">
                {['left', 'center', 'right', 'justify'].map(align => (
                  <button 
                    key={align}
                    onClick={() => updateStyle('textAlign', align)}
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${styles.textAlign === align ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                  >
                    {align.slice(0, 1)}
                  </button>
                ))}
              </div>
            </label>
          </div>
        )}

        {/* Spacing & Layout */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Spacing & Size</h4>
          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1">
              <span className="text-slate-400 text-[10px]">Padding</span>
              <input 
                type="text" 
                value={styles.padding || ''} 
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="0px"
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400 text-[10px]">Margin</span>
              <input 
                type="text" 
                value={styles.margin || ''} 
                onChange={(e) => updateStyle('margin', e.target.value)}
                placeholder="0px"
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400 text-[10px]">Width</span>
              <input 
                type="text" 
                value={styles.width || ''} 
                onChange={(e) => updateStyle('width', e.target.value)}
                placeholder="auto"
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="space-y-1">
              <span className="text-slate-400 text-[10px]">Height</span>
              <input 
                type="text" 
                value={styles.height || ''} 
                onChange={(e) => updateStyle('height', e.target.value)}
                placeholder="auto"
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* Borders & Effects */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Borders & Effects</h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-300">Radius</span>
              <input 
                type="text" 
                value={styles.borderRadius || ''} 
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                placeholder="0px"
                className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-300">Opacity</span>
              <input 
                type="number" 
                min="0" max="1" step="0.1"
                value={styles.opacity || ''} 
                onChange={(e) => updateStyle('opacity', e.target.value)}
                placeholder="1.0"
                className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-300">Shadow</span>
              <select 
                value={styles.boxShadow || ''} 
                onChange={(e) => updateStyle('boxShadow', e.target.value)}
                className="w-24 bg-slate-800 border border-slate-700 rounded px-1 py-1 outline-none"
              >
                <option value="">None</option>
                <option value="0 1px 3px rgba(0,0,0,0.12)">Sm</option>
                <option value="0 4px 6px rgba(0,0,0,0.1)">Md</option>
                <option value="0 10px 15px rgba(0,0,0,0.1)">Lg</option>
                <option value="0 25px 50px rgba(0,0,0,0.25)">Xl</option>
              </select>
            </label>
            
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-300">Rotate (deg)</span>
              <input 
                type="number" 
                value={styles.transform?.replace(/[^0-9-]/g, '') || ''} 
                onChange={(e) => updateStyle('transform', e.target.value ? `rotate(${e.target.value}deg)` : '')}
                placeholder="0"
                className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
              />
            </label>

            {(elementType === 'image' || elementType === 'card') && (
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-300">Object Fit</span>
                <select 
                  value={styles.objectFit || ''} 
                  onChange={(e) => updateStyle('objectFit', e.target.value)}
                  className="w-24 bg-slate-800 border border-slate-700 rounded px-1 py-1 outline-none"
                >
                  <option value="">Default</option>
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="fill">Fill</option>
                </select>
              </label>
            )}
          </div>
        </div>

        {/* Animations */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-1">
            <HiCube className="w-3 h-3 text-emerald-500" /> Animation
          </h4>
          <div className="space-y-2">
            <label className="flex items-center justify-between gap-2">
              <span className="text-slate-300">Effect</span>
              <select 
                value={styles.animationName || ''} 
                onChange={(e) => {
                  updateStyle('animationName', e.target.value);
                  if (e.target.value && !styles.animationDuration) updateStyle('animationDuration', '0.8s');
                  if (e.target.value && !styles.animationFillMode) updateStyle('animationFillMode', 'both');
                }}
                className="w-24 bg-slate-800 border border-slate-700 rounded px-1 py-1 outline-none focus:border-emerald-500"
              >
                <option value="">None</option>
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="zoomIn">Zoom In</option>
                <option value="bounce">Bounce</option>
                <option value="pulse">Pulse</option>
              </select>
            </label>
            
            {styles.animationName && (
              <label className="flex items-center justify-between gap-2">
                <span className="text-slate-300">Duration</span>
                <input 
                  type="text" 
                  value={styles.animationDuration || ''} 
                  onChange={(e) => updateStyle('animationDuration', e.target.value)}
                  placeholder="0.8s"
                  className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 outline-none focus:border-emerald-500"
                />
              </label>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
