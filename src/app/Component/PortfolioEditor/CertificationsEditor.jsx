'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function CertificationsEditor() {
  const { portfolio, addItem, updateItem, removeItem } = usePortfolio();
  
  const certifications = portfolio.certifications || [];
  const awards = portfolio.awards || [];

  // Handlers for Certifications
  const handleAddCert = () => {
    addItem('certifications', { name: '', issuer: '', date: '', credentialUrl: '' });
  };
  const handleUpdateCert = (id, field, value) => {
    updateItem('certifications', id, { [field]: value });
  };

  // Handlers for Awards
  const handleAddAward = () => {
    addItem('awards', { title: '', organization: '', year: '', description: '' });
  };
  const handleUpdateAward = (id, field, value) => {
    updateItem('awards', id, { [field]: value });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Certifications & Licenses</h2>
      
      <div className="flex flex-col gap-6 mb-10">
        {certifications.map((item) => (
          <div key={item.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            <button
              onClick={() => removeItem('certifications', item.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove certification"
            >
              ✕
            </button>
            
            <div className="grid grid-cols-2 gap-5 mb-5 pr-8">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Certification Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleUpdateCert(item.id, 'name', e.target.value)}
                  placeholder="e.g. AWS Certified Developer"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Issuing Organization</label>
                <input
                  type="text"
                  value={item.issuer || ''}
                  onChange={(e) => handleUpdateCert(item.id, 'issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Issue Date</label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => handleUpdateCert(item.id, 'date', e.target.value)}
                  placeholder="e.g. Jun 2023"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Credential URL</label>
                <input
                  type="text"
                  value={item.credentialUrl || ''}
                  onChange={(e) => handleUpdateCert(item.id, 'credentialUrl', e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
        
        {certifications.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No certifications added yet.</p>
          </div>
        )}

        <button
          onClick={handleAddCert}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
        >
          <span>+</span> Add Certification
        </button>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Awards & Honors</h2>
        
        <div className="flex flex-col gap-6 mb-6">
          {awards.map((item) => (
            <div key={item.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
              <button
                onClick={() => removeItem('awards', item.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
                title="Remove award"
              >
                ✕
              </button>
              
              <div className="grid grid-cols-2 gap-5 mb-5 pr-8">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Award Title</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleUpdateAward(item.id, 'title', e.target.value)}
                    placeholder="e.g. Employee of the Year"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Organization</label>
                  <input
                    type="text"
                    value={item.organization || ''}
                    onChange={(e) => handleUpdateAward(item.id, 'organization', e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
                <input
                  type="text"
                  value={item.year || ''}
                  onChange={(e) => handleUpdateAward(item.id, 'year', e.target.value)}
                  placeholder="e.g. 2022"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (Optional)</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => handleUpdateAward(item.id, 'description', e.target.value)}
                  rows={3}
                  placeholder="Why did you receive this award?"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
                />
              </div>
            </div>
          ))}
          
          {awards.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm">No awards added yet.</p>
            </div>
          )}
        </div>

        <button
          onClick={handleAddAward}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
        >
          <span>+</span> Add Award
        </button>
      </div>
    </div>
  );
}
