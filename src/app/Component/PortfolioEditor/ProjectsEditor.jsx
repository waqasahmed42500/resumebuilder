'use client';

import { useEffect, useRef } from 'react';
import { usePortfolio } from '@/app/context/PortfolioContext';
import ImageUpload from './ImageUpload';

export default function ProjectsEditor() {
  const { portfolio, addItem, updateItem, removeItem } = usePortfolio();
  const projects = portfolio.projects || [];
  const cardRefs = useRef({});

  const handleAdd = () => {
    addItem('projects', {
      title: '',
      description: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      tags: []
    });
  };

  const handleUpdate = (id, field, value) => {
    updateItem('projects', id, { [field]: value });
  };

  const handleTagsChange = (id, value) => {
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(Boolean);
    updateItem('projects', id, { tags: tagsArray });
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const { section, itemId } = e.detail;
      if (section === 'projects' && itemId && cardRefs.current[itemId]) {
        cardRefs.current[itemId].scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight effect
        cardRefs.current[itemId].classList.add('ring-4', 'ring-emerald-500', 'ring-opacity-50');
        setTimeout(() => {
          if (cardRefs.current[itemId]) {
            cardRefs.current[itemId].classList.remove('ring-4', 'ring-emerald-500', 'ring-opacity-50');
          }
        }, 1500);
      }
    };
    window.addEventListener('SCROLL_TO_ITEM', handleScroll);
    return () => window.removeEventListener('SCROLL_TO_ITEM', handleScroll);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Projects & Portfolio</h2>
      
      <div className="flex flex-col gap-6 mb-6">
        {projects.map((item) => (
          <div 
            key={item.id} 
            ref={el => cardRefs.current[item.id] = el}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative transition-all duration-500"
          >
            <button
              onClick={() => removeItem('projects', item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove project"
            >
              ✕
            </button>
            
            <div className="mb-5 pr-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  placeholder="e.g. E-Commerce Platform"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              
              <div>
                <ImageUpload
                  value={item.image || ''}
                  onChange={(val) => handleUpdate(item.id, 'image', val)}
                  label="Project Image / Thumbnail"
                />
              </div>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                rows={3}
                placeholder="What did you build and why?"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Live URL</label>
                <input
                  type="text"
                  value={item.liveUrl || ''}
                  onChange={(e) => handleUpdate(item.id, 'liveUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">GitHub URL</label>
                <input
                  type="text"
                  value={item.githubUrl || ''}
                  onChange={(e) => handleUpdate(item.id, 'githubUrl', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 pt-3 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Case Study URL</label>
                <input
                  type="text"
                  value={item.caseStudyUrl || ''}
                  onChange={(e) => handleUpdate(item.id, 'caseStudyUrl', e.target.value)}
                  placeholder="e.g. Medium / Notion link"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Video Demo URL</label>
                <input
                  type="text"
                  value={item.videoDemoUrl || ''}
                  onChange={(e) => handleUpdate(item.id, 'videoDemoUrl', e.target.value)}
                  placeholder="e.g. YouTube / Loom link"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Documentation</label>
                <input
                  type="text"
                  value={item.documentationUrl || ''}
                  onChange={(e) => handleUpdate(item.id, 'documentationUrl', e.target.value)}
                  placeholder="e.g. ReadMe / Docs link"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tags / Technologies</label>
              <input
                type="text"
                value={(item.tags || []).join(', ')}
                onChange={(e) => handleTagsChange(item.id, e.target.value)}
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              />
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No projects added yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
      >
        <span>+</span> Add Project
      </button>
    </div>
  );
}
