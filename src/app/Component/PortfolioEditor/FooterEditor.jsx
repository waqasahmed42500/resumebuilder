'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function FooterEditor() {
  const { portfolio, updateNested } = usePortfolio();
  
  const footer = portfolio.footer || { showFooter: true, privacyPolicyUrl: '', termsUrl: '' };

  const handleFooterChange = (field, value) => {
    updateNested('footer', field, value);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Footer Settings</h2>
      
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-800">Portfolio Footer</h3>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
            <span className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input 
                type="checkbox" 
                checked={footer.showFooter !== false}
                onChange={(e) => handleFooterChange('showFooter', e.target.checked)}
                className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-emerald-500 transition-all duration-200"
                style={{ right: footer.showFooter !== false ? '0' : '1.25rem', borderColor: footer.showFooter !== false ? '#10b981' : '#cbd5e1' }}
              />
              <span className={`toggle-label block overflow-hidden h-5 rounded-full ${footer.showFooter !== false ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
            </span>
            Enable Footer
          </label>
        </div>

        <div className={`flex flex-col gap-5 ${footer.showFooter === false ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <span>🛡️</span> Privacy Policy URL
            </label>
            <input
              type="url"
              value={footer.privacyPolicyUrl || ''}
              onChange={(e) => handleFooterChange('privacyPolicyUrl', e.target.value)}
              placeholder="e.g. https://yourdomain.com/privacy"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1.5">Leave blank to hide this link in the footer.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              <span>📜</span> Terms & Conditions URL
            </label>
            <input
              type="url"
              value={footer.termsUrl || ''}
              onChange={(e) => handleFooterChange('termsUrl', e.target.value)}
              placeholder="e.g. https://yourdomain.com/terms"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1.5">Leave blank to hide this link in the footer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
