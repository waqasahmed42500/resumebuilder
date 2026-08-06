import React from 'react';

export default function ServicesSection({ data, theme, variant, sectionId }) {
  if (!data || data.length === 0) return null;

  return (
    <section data-editable-section="services" className="portfolio-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 w-full overflow-hidden" id={sectionId}>
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-500">Offerings</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mt-1">
            Services & Packages
          </h2>
        </div>

        {/* 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.map((service) => (
            <div
              key={service.id || service.title}
              data-editable-card={`services:${service.id}`}
              className="portfolio-section-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 shadow-sm"
                  style={{ backgroundColor: `${theme.primaryColor || '#3b82f6'}20`, color: theme.primaryColor || '#3b82f6' }}
                >
                  {service.icon || '🛠️'}
                </div>

                <h3 className="text-xl font-extrabold">{service.title}</h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {service.price && (
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Investment</span>
                  <span className="text-sm font-extrabold text-emerald-500">{service.price}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
