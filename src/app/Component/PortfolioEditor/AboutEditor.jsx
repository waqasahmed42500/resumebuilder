'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function AboutEditor() {
  const { portfolio, updateNested } = usePortfolio();
  const about = portfolio.about || { bio: '', highlights: [] };

  const handleBioChange = (e) => {
    updateNested('about', 'bio', e.target.value);
  };

  const handleAddHighlight = () => {
    const newHighlights = [...(about.highlights || []), ''];
    updateNested('about', 'highlights', newHighlights);
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...(about.highlights || [])];
    newHighlights[index] = value;
    updateNested('about', 'highlights', newHighlights);
  };

  const handleRemoveHighlight = (index) => {
    const newHighlights = [...(about.highlights || [])];
    newHighlights.splice(index, 1);
    updateNested('about', 'highlights', newHighlights);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">About Me</h2>
      
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
          <textarea
            value={about.bio || ''}
            onChange={handleBioChange}
            rows={4}
            placeholder="Write a brief introduction about yourself..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-700">Highlights / Key Details</label>
          </div>
          
          <div className="flex flex-col gap-3 mb-4">
            {(about.highlights || []).map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  placeholder="e.g. 5+ Years Experience"
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
                <button
                  onClick={() => handleRemoveHighlight(index)}
                  className="p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddHighlight}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            + Add Highlight
          </button>
        </div>
      </div>
    </div>
  );
}
