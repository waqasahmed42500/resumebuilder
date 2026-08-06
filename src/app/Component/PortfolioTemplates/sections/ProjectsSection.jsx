import React from 'react';

export default function ProjectsSection({ data, theme, variant, templateId, sectionId }) {
  if (!data || data.length === 0) return null;

  return (
    <section data-editable-section="projects" className="portfolio-section py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 w-full overflow-hidden" id={sectionId}>
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-2">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-500">Portfolio</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mt-1">
              Featured Work
            </h2>
          </div>
          <span className="text-xs font-mono opacity-60 font-semibold">{data.length} Projects Showcase</span>
        </div>

        {/* Mobile-First Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.map((project) => (
            <div
              key={project.id || project.title}
              data-editable-card={`projects:${project.id}`}
              className="portfolio-section-card group rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between h-full"
            >
              {/* Image Aspect Ratio Container */}
              {project.image ? (
                <div className="w-full aspect-video overflow-hidden relative bg-slate-900 shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {project.category && (
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/90 text-white px-2.5 py-0.5 rounded-full backdrop-blur-md border border-slate-700">
                      {project.category}
                    </span>
                  )}
                </div>
              ) : (
                <div
                  className="w-full aspect-video flex flex-col items-center justify-center p-6 text-center shrink-0 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${theme.primaryColor || '#3b82f6'}20, #0f172a)` }}
                >
                  <span className="text-2xl sm:text-3xl font-black opacity-40 text-white uppercase tracking-widest truncate max-w-full px-2">
                    {project.title}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold group-hover:text-emerald-500 transition-colors truncate">
                    {project.title}
                  </h3>
                  {project.duration && (
                    <span className="text-[10px] sm:text-xs font-mono text-slate-400 shrink-0">{project.duration}</span>
                  )}
                </div>

                <p className="text-xs sm:text-sm opacity-80 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Links */}
                <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-extrabold px-3 py-1.5 rounded-lg text-white shadow-md transition-all hover:opacity-90 active:scale-95 flex items-center gap-1"
                      style={{ backgroundColor: theme.primaryColor || '#3b82f6' }}
                    >
                      <span>🚀</span> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <span>💻</span> Source Code
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <span>📝</span> Case Study
                    </a>
                  )}
                  {project.videoDemoUrl && (
                    <a
                      href={project.videoDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <span>▶️</span> Video
                    </a>
                  )}
                  {project.documentationUrl && (
                    <a
                      href={project.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                    >
                      <span>📚</span> Docs
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
