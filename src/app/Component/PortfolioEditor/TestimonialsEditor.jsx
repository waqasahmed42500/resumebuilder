'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';
import ImageUpload from './ImageUpload';

export default function TestimonialsEditor() {
  const { portfolio, addItem, updateItem, removeItem } = usePortfolio();
  const testimonials = portfolio.testimonials || [];

  const handleAdd = () => {
    addItem('testimonials', {
      name: '',
      company: '',
      role: '',
      text: '',
      avatar: ''
    });
  };

  const handleUpdate = (id, field, value) => {
    updateItem('testimonials', id, { [field]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Testimonials</h2>
      
      <div className="flex flex-col gap-6 mb-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            <button
              onClick={() => removeItem('testimonials', item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove testimonial"
            >
              ✕
            </button>
            
            <div className="mb-5 pr-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Client / Colleague Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <ImageUpload
                  value={item.avatar || ''}
                  onChange={(val) => handleUpdate(item.id, 'avatar', val)}
                  label="Client Avatar (Optional)"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                <input
                  type="text"
                  value={item.company || ''}
                  onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role / Position</label>
                <input
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => handleUpdate(item.id, 'role', e.target.value)}
                  placeholder="e.g. CEO"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Testimonial Text</label>
              <textarea
                value={item.text || ''}
                onChange={(e) => handleUpdate(item.id, 'text', e.target.value)}
                rows={4}
                placeholder="What did they say about you?"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
              />
            </div>
          </div>
        ))}
        
        {testimonials.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No testimonials added yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
      >
        <span>+</span> Add Testimonial
      </button>
    </div>
  );
}
