import React from 'react';

export default function TestimonialsSection({ data, theme, variant, sectionId }) {
  if (!data || data.length === 0) return null;

  const isDark = variant === 'dark';
  const bgClass = variant === 'colorful' ? 'bg-black/10' : isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900';
  const cardBg = variant === 'colorful' ? 'bg-white/5' : isDark ? 'bg-gray-900' : 'bg-white';

  return (
    <section 
      data-editable-section="testimonials"
      className={`portfolio-section py-16 md:py-24 px-6 md:px-12 lg:px-24 ${bgClass}`}
      id={sectionId}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{color: variant === 'colorful' ? '#fff' : theme.primaryColor}}>
          What Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((testimonial) => (
            <div 
              key={testimonial.id || testimonial.name} 
              data-editable-card={`testimonials:${testimonial.id}`}
              className={`p-8 rounded-2xl relative shadow-sm ${cardBg}`}
            >
              <div 
                className="text-6xl absolute top-4 right-6 opacity-10 font-serif leading-none"
                style={{ color: variant === 'colorful' ? '#fff' : theme.primaryColor }}
              >
                "
              </div>
              
              <p className="text-lg italic opacity-90 mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                {testimonial.avatar ? (
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${theme.primaryColor}30`, color: variant === 'colorful' ? '#fff' : theme.primaryColor }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="text-sm opacity-75">
                    {testimonial.role} {testimonial.company && `@ ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
