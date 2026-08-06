import React from 'react';

export default function AboutSection({ data, theme, variant, sectionId }) {
  if (!data) return null;

  const { bio, highlights } = data;
  
  const isDark = variant === 'dark';
  const bgClass = variant === 'colorful' ? 'bg-black/10' : isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900';
  const cardBg = variant === 'colorful' ? 'bg-white/10' : isDark ? 'bg-gray-700' : 'bg-white';

  return (
    <section 
      className={`portfolio-section py-16 md:py-24 px-6 md:px-12 lg:px-24 ${bgClass}`}
      id={sectionId}
      data-editable-section="about"
    >
      <div className="max-w-5xl mx-auto">
        <h2 data-editable-text="about.title" className="text-3xl md:text-4xl font-bold mb-8" style={{color: variant === 'colorful' ? '#fff' : theme.primaryColor}}>
          About Me
        </h2>
        
        {bio && (
          <p data-editable-text="about.bio" className="text-lg md:text-xl leading-relaxed mb-12 opacity-90 max-w-3xl">
            {bio}
          </p>
        )}

        {highlights && highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl shadow-sm border border-opacity-10 flex items-start gap-4 transition-transform hover:-translate-y-1 ${cardBg}`}
                style={{ borderColor: theme.accentColor }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                >
                  ✨
                </div>
                <div className="font-medium text-lg leading-snug pt-2">
                  {highlight}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
