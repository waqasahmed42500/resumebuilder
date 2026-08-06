'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function EducationEditor() {
  const { portfolio, addItem, updateItem, removeItem } = usePortfolio();
  const education = portfolio.education || [];

  const handleAdd = () => {
    addItem('education', {
      institution: '',
      degree: '',
      field: '',
      year: '',
      description: ''
    });
  };

  const handleUpdate = (id, field, value) => {
    updateItem('education', id, { [field]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Education</h2>
      
      <div className="flex flex-col gap-6 mb-6">
        {education.map((item) => (
          <div key={item.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            <button
              onClick={() => removeItem('education', item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove education"
            >
              ✕
            </button>
            
            <div className="grid grid-cols-2 gap-5 mb-5 pr-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Institution</label>
                <input
                  type="text"
                  value={item.institution || ''}
                  onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Degree</label>
                <input
                  type="text"
                  value={item.degree || ''}
                  onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                  placeholder="e.g. Bachelor of Science"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Field of Study</label>
                <input
                  type="text"
                  value={item.field || ''}
                  onChange={(e) => handleUpdate(item.id, 'field', e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Graduation Year</label>
                <input
                  type="text"
                  value={item.year || ''}
                  onChange={(e) => handleUpdate(item.id, 'year', e.target.value)}
                  placeholder="e.g. 2021"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (Optional)</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                rows={3}
                placeholder="Activities, societies, awards, or relevant coursework..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
              />
            </div>
          </div>
        ))}
        
        {education.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No education entries added yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
      >
        <span>+</span> Add Education
      </button>
    </div>
  );
}
