'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';
import { useEffect, useRef } from 'react';

export default function ExperienceEditor() {
  const { portfolio, addItem, updateItem, removeItem } = usePortfolio();
  const experience = portfolio.experience || [];
  const cardRefs = useRef({});

  const handleAdd = () => {
    addItem('experience', {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    });
  };

  const handleUpdate = (id, field, value) => {
    updateItem('experience', id, { [field]: value });
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const { section, itemId } = e.detail;
      if (section === 'experience' && itemId && cardRefs.current[itemId]) {
        cardRefs.current[itemId].scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <h2 className="text-lg font-bold text-slate-900 mb-6">Work Experience</h2>
      
      <div className="flex flex-col gap-6 mb-6">
        {experience.map((item) => (
          <div 
            key={item.id} 
            ref={el => cardRefs.current[item.id] = el}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative transition-all duration-500"
          >
            <button
              onClick={() => removeItem('experience', item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove experience"
            >
              ✕
            </button>
            
            <div className="grid grid-cols-2 gap-5 mb-5 pr-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Company / Organization</label>
                <input
                  type="text"
                  value={item.company || ''}
                  onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
                  placeholder="e.g. Google"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role / Job Title</label>
                <input
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                <input
                  type="text"
                  value={item.startDate || ''}
                  onChange={(e) => handleUpdate(item.id, 'startDate', e.target.value)}
                  placeholder="e.g. Jan 2020"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">End Date</label>
                  <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.current || false}
                      onChange={(e) => handleUpdate(item.id, 'current', e.target.checked)}
                      className="rounded text-emerald-500 focus:ring-emerald-500"
                    />
                    I currently work here
                  </label>
                </div>
                <input
                  type="text"
                  value={item.current ? 'Present' : (item.endDate || '')}
                  onChange={(e) => handleUpdate(item.id, 'endDate', e.target.value)}
                  disabled={item.current}
                  placeholder="e.g. Dec 2022"
                  className={`w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors ${item.current ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
              />
            </div>
          </div>
        ))}
        
        {experience.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No experience entries added yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
      >
        <span>+</span> Add Work Experience
      </button>
    </div>
  );
}
