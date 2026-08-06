import React from 'react';

export default function CertificationsSection({ data, theme, variant, sectionId }) {
  const { certifications, awards } = data || {};
  
  if ((!certifications || certifications.length === 0) && (!awards || awards.length === 0)) return null;

  const isDark = variant === 'dark';
  const bgClass = variant === 'colorful' ? '' : isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const itemBg = variant === 'colorful' ? 'bg-white/10' : isDark ? 'bg-gray-800' : 'bg-gray-50';

  return (
    <section 
      data-editable-section="certifications"
      className={`portfolio-section py-16 md:py-24 px-6 md:px-12 lg:px-24 ${bgClass}`}
      id={sectionId}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{color: variant === 'colorful' ? '#fff' : theme.primaryColor}}>
          Certifications & Awards
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          {certifications && certifications.length > 0 && (
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 opacity-90" style={{ borderColor: `${theme.primaryColor}40` }}>
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map(cert => (
                  <div key={cert.id || cert.name} data-editable-card={`certifications:${cert.id}`} className={`p-6 rounded-xl shadow-sm ${itemBg}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-lg">{cert.name}</h4>
                        <div className="opacity-75">{cert.issuer}</div>
                      </div>
                      <div className="text-sm font-semibold opacity-60 text-right whitespace-nowrap">
                        {cert.date}
                      </div>
                    </div>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-sm font-bold hover:underline"
                        style={{ color: variant === 'colorful' ? '#fff' : theme.accentColor }}
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {awards && awards.length > 0 && (
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4 opacity-90" style={{ borderColor: `${theme.primaryColor}40` }}>
                Awards
              </h3>
              <div className="space-y-4">
                {awards.map(award => (
                  <div key={award.id || award.title} data-editable-card={`awards:${award.id}`} className={`p-6 rounded-xl shadow-sm ${itemBg}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-lg">{award.title}</h4>
                        <div className="opacity-75">{award.organization}</div>
                      </div>
                      <div className="text-sm font-semibold opacity-60 text-right whitespace-nowrap">
                        {award.year}
                      </div>
                    </div>
                    {award.description && (
                      <p className="mt-3 opacity-80 text-sm">
                        {award.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
