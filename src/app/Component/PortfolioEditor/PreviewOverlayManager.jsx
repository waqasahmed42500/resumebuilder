'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  HiPencil, HiPhotograph, HiTrash, HiDocumentDuplicate, 
  HiArrowUp, HiArrowDown, HiEyeOff, HiColorSwatch 
} from 'react-icons/hi';
import LiveStyleEditor from './LiveStyleEditor';

export default function PreviewOverlayManager({ customStyles = {} }) {
  // We use separate state for Hover vs Selection to allow distinct visual boxes.
  const [hoverMeta, setHoverMeta] = useState(null);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [multiSelectMeta, setMultiSelectMeta] = useState([]); // Array of meta objects
  
  const [hoverBounds, setHoverBounds] = useState({});
  const [selectedBounds, setSelectedBounds] = useState({});
  
  const [isEditingText, setIsEditingText] = useState(false);
  const [editText, setEditText] = useState('');
  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  const textInputRef = useRef(null);
  const clipboardRef = useRef(null); 

  // Helper to determine element metadata
  const getElementMeta = (target) => {
    const editableSection = target.closest('[data-editable-section]');
    const editableText = target.closest('[data-editable-text]');
    const editableImage = target.closest('[data-editable-image]');
    const editableCard = target.closest('[data-editable-card]');
    const editableButton = target.closest('[data-editable-button]');

    // Find the smallest element (closest match)
    const el = editableText || editableImage || editableButton || editableCard || editableSection;
    if (!el) return null;

    let type = null;
    let data = {};
    let selector = '';

    if (editableText) {
      type = 'text';
      data = { field: editableText.dataset.editableText };
      selector = `[data-editable-text="${data.field}"]`;
    } else if (editableImage) {
      type = 'image';
      data = { field: editableImage.dataset.editableImage };
      selector = `[data-editable-image="${data.field}"]`;
    } else if (editableButton) {
      type = 'button';
      data = { field: editableButton.dataset.editableButton };
      selector = `[data-editable-button="${data.field}"]`;
    } else if (editableCard) {
      type = 'card';
      const [section, id] = editableCard.dataset.editableCard.split(':');
      data = { section, itemId: id };
      selector = `[data-editable-card="${editableCard.dataset.editableCard}"]`;
    } else if (editableSection) {
      type = 'section';
      data = { section: editableSection.dataset.editableSection };
      selector = `[data-editable-section="${data.section}"]`;
    }

    return { el, type, data, selector };
  };

  const dispatchAction = useCallback((action, payload = {}) => {
    window.parent.postMessage({ type: 'INLINE_ACTION', action, ...payload }, '*');
  }, []);

  const getBounds = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
      borderRadius: window.getComputedStyle(el).borderRadius || '0px'
    };
  };

  const updateBounds = useCallback(() => {
    if (hoverMeta?.el) {
      setHoverBounds(getBounds(hoverMeta.el));
    }
    if (selectedMeta?.el) {
      setSelectedBounds(getBounds(selectedMeta.el));
    }
  }, [hoverMeta, selectedMeta]);

  useEffect(() => {
    updateBounds();
    window.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds);
    return () => {
      window.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
    };
  }, [updateBounds]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isEditingText || showStyleEditor) return;
      if (e.target.closest('.preview-overlay-actions') || e.target.closest('.context-menu')) return;

      const meta = getElementMeta(e.target);
      if (meta && hoverMeta?.el !== meta.el) {
        setHoverMeta(meta);
      } else if (!meta && hoverMeta) {
        setHoverMeta(null);
      }
    };

    const handleClick = (e) => {
      if (e.target.closest('.preview-overlay-actions') || e.target.closest('.context-menu') || e.target.closest('.style-editor-panel')) return;
      if (isEditingText) return;

      setContextMenu(null);

      const meta = getElementMeta(e.target);
      if (meta) {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.shiftKey || e.ctrlKey || e.metaKey) {
          const exists = multiSelectMeta.find(s => s.el === meta.el);
          if (exists) {
            setMultiSelectMeta(prev => prev.filter(s => s.el !== meta.el));
            if (selectedMeta?.el === meta.el) setSelectedMeta(null);
          } else {
            setMultiSelectMeta(prev => [...prev, meta]);
            if (!selectedMeta) setSelectedMeta(meta);
          }
        } else {
          setSelectedMeta(meta);
          setMultiSelectMeta([meta]);
          
          let targetSection = meta.data.section || meta.data.field?.split('.')[0] || 'personalInfo';
          if (meta.data.field?.includes('avatar') || meta.data.field?.startsWith('socialLinks.')) targetSection = 'personalInfo';
          if (meta.data.field?.startsWith('contact.')) targetSection = 'contact';
          
          dispatchAction('AUTO_FOCUS', { section: targetSection, itemId: meta.data.itemId });

          // Specific element click handlers
          if (meta.type === 'image') {
            dispatchAction('OPEN_EDITOR', { section: 'personalInfo' });
          } else if (meta.type === 'button') {
             dispatchAction('OPEN_EDITOR', { section: targetSection });
          } else if (meta.type === 'section') {
             dispatchAction('OPEN_EDITOR', { section: targetSection });
          }
        }
      } else {
        setSelectedMeta(null);
        setMultiSelectMeta([]);
        setShowStyleEditor(false);
      }
    };

    const handleDoubleClick = (e) => {
      if (e.target.closest('.preview-overlay-actions') || e.target.closest('.style-editor-panel')) return;
      const meta = getElementMeta(e.target);
      
      // Double click ONLY triggers inline editing for text elements
      if (meta && meta.type === 'text') {
        e.preventDefault();
        e.stopPropagation();
        setIsEditingText(true);
        setEditText(meta.el.innerText);
        setTimeout(() => {
          if (textInputRef.current) {
            textInputRef.current.focus();
            textInputRef.current.select();
          }
        }, 50);
      }
    };

    const handleContextMenu = (e) => {
      const meta = getElementMeta(e.target);
      if (meta) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedMeta(meta);
        setMultiSelectMeta([meta]);
        setContextMenu({ x: e.clientX, y: e.clientY });
      }
    };

    const handleKeyDown = (e) => {
      if (isEditingText) return;

      if (e.key === 'Escape') {
        if (showStyleEditor) {
          setShowStyleEditor(false);
          return;
        }
        if (selectedMeta) {
          const parentEditable = getElementMeta(selectedMeta.el.parentElement);
          if (parentEditable && parentEditable.el !== selectedMeta.el) {
            setSelectedMeta(parentEditable);
            setMultiSelectMeta([parentEditable]);
          } else {
            setSelectedMeta(null);
            setMultiSelectMeta([]);
          }
        }
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && multiSelectMeta.length > 0) {
        multiSelectMeta.forEach(sel => {
          if (sel.type === 'card' || sel.type === 'section') {
            dispatchAction(sel.type === 'card' ? 'DELETE_ITEM' : 'HIDE_SECTION', { section: sel.data.section, itemId: sel.data.itemId });
          } else if (sel.type === 'text' || sel.type === 'image') {
            dispatchAction('UPDATE_TEXT', { field: sel.data.field, value: '' });
          }
        });
        setSelectedMeta(null);
        setMultiSelectMeta([]);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && multiSelectMeta.length > 0) {
        clipboardRef.current = multiSelectMeta;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && clipboardRef.current) {
        clipboardRef.current.forEach(sel => {
          if (sel.type === 'card') {
            dispatchAction('DUPLICATE_ITEM', { section: sel.data.section, itemId: sel.data.itemId });
          }
        });
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          dispatchAction('REDO');
        } else {
          dispatchAction('UNDO');
        }
      }
    };

    let touchTimer = null;
    let lastTapTime = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      const target = e.target;
      
      touchTimer = setTimeout(() => {
        const meta = getElementMeta(target);
        if (meta && !isEditingText) {
          setSelectedMeta(meta);
          setMultiSelectMeta([meta]);
          setContextMenu({ x: touch.clientX, y: touch.clientY });
        }
      }, 500);
    };

    const handleTouchMove = () => {
      if (touchTimer) clearTimeout(touchTimer);
    };

    const handleTouchEnd = (e) => {
      if (touchTimer) clearTimeout(touchTimer);
      
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTime;
      
      if (tapLength < 300 && tapLength > 0) {
        const meta = getElementMeta(e.target);
        if (meta && meta.type === 'text' && !isEditingText) {
          setIsEditingText(true);
          setEditText(meta.el.innerText);
          setTimeout(() => {
            if (textInputRef.current) {
              textInputRef.current.focus();
              textInputRef.current.select();
            }
          }, 50);
        }
      }
      lastTapTime = currentTime;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('dblclick', handleDoubleClick, { capture: true });
    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('dblclick', handleDoubleClick, { capture: true });
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isEditingText, selectedMeta, multiSelectMeta, showStyleEditor, dispatchAction]);

  const handleTextSave = () => {
    setIsEditingText(false);
    if (selectedMeta?.data.field) {
      dispatchAction('UPDATE_TEXT', { field: selectedMeta.data.field, value: editText });
    }
  };

  const handleStyleChange = (styles) => {
    if (selectedMeta?.selector) {
      dispatchAction('UPDATE_STYLE', { elementKey: selectedMeta.selector, styles });
    }
  };

  // Prevent rendering overlay logic if no hover/selection
  if (!hoverMeta && !selectedMeta && !isEditingText) return null;

  const isHoverSelected = selectedMeta && hoverMeta && selectedMeta.el === hoverMeta.el;
  const currentSelectorStyles = selectedMeta ? (customStyles[selectedMeta.selector] || {}) : {};

  return (
    <>
      {/* 1. HOVER BOX (Subtle Highlight) */}
      {hoverMeta && !isHoverSelected && (
        <div 
          className="absolute z-[9980] pointer-events-none transition-all duration-150 border-[2px] border-blue-500 bg-blue-500/10 shadow-inner"
          style={hoverBounds}
        >
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full text-white flex items-center justify-center shadow-lg border-2 border-white">
            {hoverMeta.type === 'image' ? <HiPhotograph className="w-3 h-3" /> : <HiPencil className="w-3 h-3" />}
          </div>
        </div>
      )}

      {/* 2. SELECTION BOX */}
      {selectedMeta && (
        <div 
          className="absolute z-[9990] pointer-events-none transition-all duration-150 border-[3px] border-blue-500"
          style={selectedBounds}
        >
          {/* Element Type Badge */}
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-t-md uppercase tracking-wider">
            {selectedMeta.type}
          </div>

          {/* Resize Handles */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm pointer-events-auto cursor-nwse-resize" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm pointer-events-auto cursor-nesw-resize" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm pointer-events-auto cursor-nesw-resize" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-blue-500 rounded-sm pointer-events-auto cursor-nwse-resize" />

          {/* Floating Toolbar */}
          <div className="absolute -top-4 -right-2 flex items-center gap-1.5 pointer-events-auto preview-overlay-actions translate-x-full pr-4 pb-4">
            
            {/* Visual Style Palette */}
            <button 
              className="w-8 h-8 rounded-full bg-slate-900 shadow-xl border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 transition-all hover:scale-110 group relative"
              onClick={(e) => { e.stopPropagation(); setShowStyleEditor(!showStyleEditor); }}
              title="Visual Style Editor"
            >
              <HiColorSwatch className="w-4 h-4 text-emerald-400" />
              {showStyleEditor && <div className="absolute inset-0 rounded-full ring-2 ring-emerald-500 animate-pulse"></div>}
            </button>

            {/* Quick Actions based on type */}
            {selectedMeta.type === 'card' && (
              <button 
                className="w-8 h-8 rounded-full bg-white shadow-xl border border-slate-200 text-emerald-500 flex items-center justify-center hover:bg-emerald-50 transition-all hover:scale-110"
                onClick={(e) => { e.stopPropagation(); dispatchAction('DUPLICATE_ITEM', { section: selectedMeta.data.section, itemId: selectedMeta.data.itemId }); }}
                title="Duplicate Card"
              >
                <HiDocumentDuplicate className="w-4 h-4" />
              </button>
            )}
            
            {selectedMeta.type === 'section' && (
               <>
                <button 
                  className="w-8 h-8 rounded-full bg-white shadow-xl border border-slate-200 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-all hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); dispatchAction('MOVE_SECTION_UP', { section: selectedMeta.data.section }); }}
                  title="Move Up"
                >
                  <HiArrowUp className="w-4 h-4" />
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-white shadow-xl border border-slate-200 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-all hover:scale-110"
                  onClick={(e) => { e.stopPropagation(); dispatchAction('MOVE_SECTION_DOWN', { section: selectedMeta.data.section }); }}
                  title="Move Down"
                >
                  <HiArrowDown className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Delete / Clear Button */}
            <button 
              className="w-8 h-8 rounded-full bg-white shadow-xl border border-slate-200 text-rose-500 flex items-center justify-center hover:bg-rose-50 transition-all hover:scale-110"
              onClick={(e) => { 
                e.stopPropagation(); 
                if (selectedMeta.type === 'card') dispatchAction('DELETE_ITEM', { section: selectedMeta.data.section, itemId: selectedMeta.data.itemId });
                else if (selectedMeta.type === 'section') dispatchAction('HIDE_SECTION', { section: selectedMeta.data.section });
                else if (selectedMeta.data.field) dispatchAction('UPDATE_TEXT', { field: selectedMeta.data.field, value: '' });
                setSelectedMeta(null);
              }}
              title="Delete / Clear"
            >
              {selectedMeta.type === 'section' ? <HiEyeOff className="w-4 h-4" /> : <HiTrash className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}

      {/* Floating Visual Style Editor */}
      {showStyleEditor && selectedMeta && (
        <div className="style-editor-panel">
          <LiveStyleEditor 
            selectedElement={selectedMeta.el}
            elementType={selectedMeta.type}
            elementData={selectedMeta.data}
            initialStyles={currentSelectorStyles}
            onStyleChange={handleStyleChange}
            onClose={() => setShowStyleEditor(false)}
          />
        </div>
      )}

      {/* Right Click Context Menu */}
      {contextMenu && (
        <div 
          className="fixed z-[10000] bg-white border border-slate-200 shadow-2xl rounded-xl py-2 w-48 text-sm text-slate-700 font-sans context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 hover:bg-slate-100 cursor-pointer flex justify-between" onClick={() => { setContextMenu(null); setShowStyleEditor(true); }}>
            <span>🎨 Style Editor</span> <span className="text-slate-400 text-xs">Space</span>
          </div>
          <div className="px-3 py-1.5 hover:bg-slate-100 cursor-pointer flex justify-between" onClick={() => { setContextMenu(null); clipboardRef.current = multiSelectMeta; }}>
            <span>📋 Copy</span> <span className="text-slate-400 text-xs">Ctrl+C</span>
          </div>
          {(selectedMeta?.type === 'card') && (
             <div className="px-3 py-1.5 hover:bg-slate-100 cursor-pointer flex justify-between" onClick={() => { setContextMenu(null); dispatchAction('DUPLICATE_ITEM', { section: selectedMeta.data.section, itemId: selectedMeta.data.itemId }); }}>
               <span>📄 Duplicate</span> <span className="text-slate-400 text-xs">Ctrl+D</span>
             </div>
          )}
          <div className="border-t border-slate-100 my-1"></div>
          <div className="px-3 py-1.5 hover:bg-red-50 text-rose-600 cursor-pointer flex justify-between" onClick={() => { 
            setContextMenu(null); 
            if (selectedMeta?.type === 'card') dispatchAction('DELETE_ITEM', { section: selectedMeta.data.section, itemId: selectedMeta.data.itemId });
            else if (selectedMeta?.type === 'section') dispatchAction('HIDE_SECTION', { section: selectedMeta.data.section });
            else if (selectedMeta?.data.field) dispatchAction('UPDATE_TEXT', { field: selectedMeta.data.field, value: '' });
          }}>
            <span>🗑️ Delete</span> <span className="text-red-400 text-xs">Del</span>
          </div>
        </div>
      )}

      {/* Inline Text Editor */}
      {isEditingText && selectedMeta && (
        <textarea
          ref={textInputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleTextSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleTextSave();
            }
          }}
          className="absolute inset-0 w-full h-full text-slate-900 resize-none outline-none ring-2 ring-blue-500 shadow-2xl p-1 pointer-events-auto z-[10000]"
          style={{ 
            fontSize: window.getComputedStyle(selectedMeta.el).fontSize,
            fontFamily: window.getComputedStyle(selectedMeta.el).fontFamily,
            fontWeight: window.getComputedStyle(selectedMeta.el).fontWeight,
            lineHeight: window.getComputedStyle(selectedMeta.el).lineHeight,
            textAlign: window.getComputedStyle(selectedMeta.el).textAlign,
            borderRadius: window.getComputedStyle(selectedMeta.el).borderRadius,
            background: 'rgba(255,255,255,0.98)',
            ...selectedBounds // overlay bounds
          }}
        />
      )}
    </>
  );
}
