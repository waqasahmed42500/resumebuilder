'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

// We import this, and optionally fallback to an empty array if it fails or is undefined
let templateConfigs = [];
try {
  templateConfigs = require('../PortfolioTemplates/templateConfigs').default || require('../PortfolioTemplates/templateConfigs').templateConfigs || [];
} catch (e) {
  // Silent fallback if it doesn't exist yet
  templateConfigs = [
    { id: 'modern', name: 'Modern Minimal', category: 'Professional' },
    { id: 'creative', name: 'Creative Studio', category: 'Creative' },
    { id: 'developer', name: 'Terminal Dev', category: 'Tech' }
  ];
}

export default function ThemeEditor() {
  const { portfolio, setTheme, setTemplate } = usePortfolio();
  const theme = portfolio.theme || {};
  const currentTemplate = portfolio.templateId || 'modern';

  const handleThemeChange = (field, value) => {
    setTheme({ ...theme, [field]: value });
  };

  const handleReset = () => {
    setTheme({
      primaryColor: '#10b981',
      accentColor: '#3b82f6',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontFamily: 'Inter',
      headingFont: 'Inter',
      borderRadius: 'md'
    });
  };

  const fonts = ['Inter', 'Geist', 'Roboto', 'Outfit', 'Playfair Display', 'Space Grotesk', 'DM Sans'];
  const borderRadii = [
    { value: 'none', label: 'Square (0px)' },
    { value: 'sm', label: 'Small (4px)' },
    { value: 'md', label: 'Medium (8px)' },
    { value: 'lg', label: 'Large (16px)' },
    { value: 'full', label: 'Pill (9999px)' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Template & Theme</h2>
      
      <div className="mb-10">
        <h3 className="font-bold text-slate-800 mb-4">Select Template</h3>
        <div className="grid grid-cols-1 gap-4">
          {templateConfigs.map((tpl) => (
            <div 
              key={tpl.id}
              onClick={() => setTemplate(tpl.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${currentTemplate === tpl.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-slate-900">{tpl.name}</h4>
                {currentTemplate === tpl.id && <span className="text-emerald-500">✓</span>}
              </div>
              <p className="text-xs text-slate-500">{tpl.category}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800">Customize Theme</h3>
          <button 
            onClick={handleReset}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 underline transition-colors"
          >
            Reset to Default
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.primaryColor || '#10b981'}
                onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-slate-200"
              />
              <span className="text-sm font-mono text-slate-600 uppercase">{theme.primaryColor || '#10b981'}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor || '#3b82f6'}
                onChange={(e) => handleThemeChange('accentColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-slate-200"
              />
              <span className="text-sm font-mono text-slate-600 uppercase">{theme.accentColor || '#3b82f6'}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.backgroundColor || '#ffffff'}
                onChange={(e) => handleThemeChange('backgroundColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-slate-200"
              />
              <span className="text-sm font-mono text-slate-600 uppercase">{theme.backgroundColor || '#ffffff'}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Text Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.textColor || '#0f172a'}
                onChange={(e) => handleThemeChange('textColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border border-slate-200"
              />
              <span className="text-sm font-mono text-slate-600 uppercase">{theme.textColor || '#0f172a'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Body Font</label>
            <select
              value={theme.fontFamily || 'Inter'}
              onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            >
              {fonts.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Heading Font</label>
            <select
              value={theme.headingFont || 'Inter'}
              onChange={(e) => handleThemeChange('headingFont', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            >
              {fonts.map(font => <option key={font} value={font}>{font}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Border Radius Strategy</label>
          <div className="grid grid-cols-1 gap-2">
            {borderRadii.map((br) => (
              <label key={br.value} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="borderRadius"
                  value={br.value}
                  checked={(theme.borderRadius || 'md') === br.value}
                  onChange={(e) => handleThemeChange('borderRadius', e.target.value)}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-sm font-medium text-slate-700">{br.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
