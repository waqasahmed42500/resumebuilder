import React from 'react';

export default function ExperienceSection({ data, theme, variant, sectionId }) {
  if (!data || data.length === 0) return null;

  const isDark = variant === 'dark';
  const bgClass = variant === 'colorful' ? 'bg-black/10' : isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900';
  const cardBg = variant === 'colorful' ? 'bg-white/5' : isDark ? 'bg-gray-900' : 'bg-white';

  return (
    <section 
      data-editable-section="experience"
      className={`portfolio-section py-16 md:py-24 px-6 md:px-12 lg:px-24 ${bgClass}`}
      id={sectionId}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{color: variant === 'colorful' ? '#fff' : theme.primaryColor}}>
          Experience
        </h2>
        
        <div className="relative border-l-2 ml-4 space-y-12" style={{ borderColor: `${theme.primaryColor}40` }}>
          {data.map((job) => (
            <div key={job.id || job.role + job.company} data-editable-card={`experience:${job.id}`} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div 
                className="absolute w-5 h-5 rounded-full -left-[11px] top-1 border-4 shadow-sm"
                style={{ 
                  backgroundColor: variant === 'colorful' ? '#fff' : isDark ? '#1f2937' : '#fff',
                  borderColor: theme.primaryColor 
                }}
              />
              
              <div className={`p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${cardBg}`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{job.role}</h3>
                    <div className="text-lg font-medium opacity-80" style={{ color: variant === 'colorful' ? '#fff' : theme.accentColor }}>
                      {job.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tracking-wider opacity-70 bg-opacity-10 px-3 py-1 rounded-full uppercase" style={{ backgroundColor: theme.primaryColor, color: variant === 'colorful' ? '#fff' : theme.primaryColor }}>
                      {job.startDate} - {job.current ? 'Present' : job.endDate}
                    </span>
                  </div>
                </div>
                
                <p className="opacity-80 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
