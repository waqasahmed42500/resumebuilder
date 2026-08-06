import React from 'react';

export default function SkillsSection({ data, theme, variant, templateId, sectionId }) {
  if (!data || data.length === 0) return null;

  // Group skills by category
  const groupedSkills = data.reduce((acc, skill) => {
    const category = skill.category || 'Core Skills';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section data-editable-section="skills" className="portfolio-section py-20 px-6 md:px-16" id={sectionId}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Expertise</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-1">
            Skills & Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="portfolio-section-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span>{category}</span>
                <span className="text-xs font-mono text-emerald-500 font-bold">{skills.length} Skills</span>
              </h3>

              <div className="space-y-5">
                {skills.map((skill, idx) => (
                  <div key={idx} data-editable-card={`skills:${skill.id || skill.name}`} className="space-y-2 group">
                    <div className="flex justify-between items-center text-xs font-extrabold relative">
                      <span className="text-slate-800 dark:text-slate-200 text-sm group-hover:text-blue-500 transition-colors">{skill.name}</span>
                      <span className="font-mono text-emerald-500">{skill.level || 85}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level || 85}%`,
                          backgroundColor: theme.primaryColor || '#3b82f6',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
