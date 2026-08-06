import React from 'react';

export default function EducationSection({ data, theme, variant, sectionId }) {
  if (!data || data.length === 0) return null;

  const isDark = variant === 'dark';
  const bgClass = variant === 'colorful' ? '' : isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const cardBg = variant === 'colorful' ? 'bg-white/10' : isDark ? 'bg-gray-800' : 'bg-gray-50';

  return (
    <section 
      data-editable-section="education"
      className={`portfolio-section py-16 md:py-24 px-6 md:px-12 lg:px-24 ${bgClass}`}
      id={sectionId}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{color: variant === 'colorful' ? '#fff' : theme.primaryColor}}>
          Education
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((edu) => (
            <div 
              key={edu.id || edu.degree} 
              data-editable-card={`education:${edu.id}`}
              className={`p-8 rounded-2xl shadow-sm border border-opacity-5 transition-transform hover:-translate-y-1 ${cardBg}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: `${theme.primaryColor}20`, color: variant === 'colorful' ? '#fff' : theme.primaryColor }}
                >
                  🎓
                </div>
                <span className="text-sm font-bold opacity-70">{edu.year}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <div className="text-lg font-medium mb-4 opacity-90" style={{ color: variant === 'colorful' ? '#fff' : theme.accentColor }}>
                {edu.institution}
              </div>
              
              {edu.description && (
                <p className="opacity-75 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
