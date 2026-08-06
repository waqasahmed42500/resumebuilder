import React from 'react';

export default function FooterSection({ data, theme, personalInfo }) {
  if (!data || data.showFooter === false) return null;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copyright */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          © {new Date().getFullYear()} {personalInfo?.firstName} {personalInfo?.lastName}. All rights reserved.
        </div>

        {/* Center: Legal Links */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {data.privacyPolicyUrl && (
            <a href={data.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
              Privacy Policy
            </a>
          )}
          {data.termsUrl && (
            <a href={data.termsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
              Terms & Conditions
            </a>
          )}
          <a href="#contact" className="hover:text-emerald-500 transition-colors">
            Contact
          </a>
        </div>

        {/* Right Side: Back to Top */}
        <button 
          onClick={scrollToTop}
          className="text-xs font-bold px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
}
