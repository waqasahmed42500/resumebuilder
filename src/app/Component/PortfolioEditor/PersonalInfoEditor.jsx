'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';
import ImageUpload from './ImageUpload';

export default function PersonalInfoEditor() {
  const { portfolio, updateNested } = usePortfolio();
  const info = portfolio.personalInfo || {};

  const handleChange = (field, value) => {
    updateNested('personalInfo', field, value);
  };

  return (
    <div className="p-2 sm:p-4 space-y-6">
      <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">Personal Information</h2>
      
      <div className="space-y-6">
        {/* Drag and Drop Image Upload Component */}
        <ImageUpload
          value={info.avatar || ''}
          onChange={(val) => handleChange('avatar', val)}
          label="Profile Picture / Avatar"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">First Name</label>
            <input
              type="text"
              value={info.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Last Name</label>
            <input
              type="text"
              value={info.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Professional Title</label>
          <input
            type="text"
            value={info.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Tagline</label>
          <input
            type="text"
            value={info.tagline || ''}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="A short catchy headline about your mission"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              value={info.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone</label>
            <input
              type="tel"
              value={info.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Location</label>
            <input
              type="text"
              value={info.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Website</label>
            <input
              type="url"
              value={info.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Resume Download URL (Optional)</label>
            <input
              type="url"
              value={info.resumeUrl || ''}
              onChange={(e) => handleChange('resumeUrl', e.target.value)}
              placeholder="Link to PDF (Google Drive, Dropbox, etc.)"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Calendly / Booking URL (Optional)</label>
            <input
              type="url"
              value={info.calendlyUrl || ''}
              onChange={(e) => handleChange('calendlyUrl', e.target.value)}
              placeholder="https://calendly.com/your-link"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
