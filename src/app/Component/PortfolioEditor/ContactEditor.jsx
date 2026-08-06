'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function ContactEditor() {
  const { portfolio, updateNested, setField } = usePortfolio();
  
  const contact = portfolio.contact || { formTitle: '', formDescription: '', showForm: true };
  const socialLinks = portfolio.socialLinks || {};

  const handleContactChange = (field, value) => {
    updateNested('contact', field, value);
  };

  const handleSocialChange = (field, value) => {
    updateNested('socialLinks', field, value);
  };

  const socialPlatforms = [
    { id: 'github', label: 'GitHub', icon: '💻' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { id: 'twitter', label: 'Twitter / X', icon: '🐦' },
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'dribbble', label: 'Dribbble', icon: '🎨' },
    { id: 'behance', label: 'Behance', icon: '🖌️' },
    { id: 'youtube', label: 'YouTube', icon: '▶️' },
    { id: 'medium', label: 'Medium', icon: '📝' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Contact & Social Links</h2>
      
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800">Contact Form</h3>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
            <span className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input 
                type="checkbox" 
                checked={contact.showForm !== false}
                onChange={(e) => handleContactChange('showForm', e.target.checked)}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-emerald-500 transition-all duration-200"
                style={{ right: contact.showForm !== false ? '0' : '1.25rem', borderColor: contact.showForm !== false ? '#10b981' : '#cbd5e1' }}
              />
              <span className={`toggle-label block overflow-hidden h-5 rounded-full ${contact.showForm !== false ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
            </span>
            Enable Form
          </label>
        </div>

        <div className={`flex flex-col gap-5 ${contact.showForm === false ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Section Title</label>
            <input
              type="text"
              value={contact.formTitle || ''}
              onChange={(e) => handleContactChange('formTitle', e.target.value)}
              placeholder="e.g. Get In Touch"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea
              value={contact.formDescription || ''}
              onChange={(e) => handleContactChange('formDescription', e.target.value)}
              rows={3}
              placeholder="A short message to encourage visitors to contact you..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-8">
        <h3 className="font-bold text-slate-800 mb-5">Direct Contact Links (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <span>💬</span> WhatsApp Number
            </label>
            <input
              type="text"
              value={contact.whatsapp || ''}
              onChange={(e) => handleContactChange('whatsapp', e.target.value)}
              placeholder="e.g. +1234567890"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <span>✈️</span> Telegram Username
            </label>
            <input
              type="text"
              value={contact.telegram || ''}
              onChange={(e) => handleContactChange('telegram', e.target.value)}
              placeholder="e.g. @username"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <span>📍</span> Google Maps Link
            </label>
            <input
              type="url"
              value={contact.googleMaps || ''}
              onChange={(e) => handleContactChange('googleMaps', e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-5">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {socialPlatforms.map((platform) => (
            <div key={platform.id}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                <span>{platform.icon}</span> {platform.label}
              </label>
              <input
                type="text"
                value={socialLinks[platform.id] || ''}
                onChange={(e) => handleSocialChange(platform.id, e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
