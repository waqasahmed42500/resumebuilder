'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function ServicesEditor() {
  const { portfolio, addItem, updateItem, removeItem } = usePortfolio();
  const services = portfolio.services || [];

  const handleAdd = () => {
    addItem('services', {
      title: '',
      description: '',
      price: '',
      icon: ''
    });
  };

  const handleUpdate = (id, field, value) => {
    updateItem('services', id, { [field]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Services / Offerings</h2>
      
      <div className="flex flex-col gap-6 mb-6">
        {services.map((item) => (
          <div key={item.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            <button
              onClick={() => removeItem('services', item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove service"
            >
              ✕
            </button>
            
            <div className="grid grid-cols-2 gap-5 mb-5 pr-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  placeholder="e.g. Web Development"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon (Emoji or URL)</label>
                <input
                  type="text"
                  value={item.icon || ''}
                  onChange={(e) => handleUpdate(item.id, 'icon', e.target.value)}
                  placeholder="e.g. 💻"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={item.description || ''}
                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                rows={3}
                placeholder="What does this service include?"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Starting Price (Optional)</label>
              <input
                type="text"
                value={item.price || ''}
                onChange={(e) => handleUpdate(item.id, 'price', e.target.value)}
                placeholder="e.g. $500 or $50/hr"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              />
            </div>
          </div>
        ))}
        
        {services.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No services added yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
      >
        <span>+</span> Add Service
      </button>
    </div>
  );
}
