import { rolesData } from './templates/roleData';
import { blogPostsData } from './blog/blogPostsData';
import { countryData } from './country/countryData';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

  // Core Static Routes — with real lastModified dates instead of dynamic new Date()
  // to prevent Google from wasting crawl budget re-crawling unchanged pages
  const staticRoutes = [
    { route: '',                           changeFreq: 'daily',   priority: 1.0,  date: '2026-07-31' },
    { route: '/builder',                   changeFreq: 'daily',   priority: 0.95, date: '2026-07-28' },
    { route: '/templates',                 changeFreq: 'weekly',  priority: 0.9,  date: '2026-07-31' },
    { route: '/ats-resume-builder',        changeFreq: 'weekly',  priority: 0.9,  date: '2026-07-31' },
    { route: '/ai-resume-builder',         changeFreq: 'weekly',  priority: 0.9,  date: '2026-07-31' },
    { route: '/resume-generator',          changeFreq: 'weekly',  priority: 0.9,  date: '2026-07-31' },
    { route: '/cv-maker',                  changeFreq: 'weekly',  priority: 0.9,  date: '2026-07-31' },
    { route: '/professional-resume-builder', changeFreq: 'weekly', priority: 0.9, date: '2026-07-31' },
    { route: '/examples',                  changeFreq: 'weekly',  priority: 0.85, date: '2026-07-28' },
    { route: '/cover-letter',              changeFreq: 'weekly',  priority: 0.85, date: '2026-07-28' },
    { route: '/blog',                      changeFreq: 'daily',   priority: 0.8,  date: '2026-07-31' },
    { route: '/country',                   changeFreq: 'monthly', priority: 0.7,  date: '2026-07-01' },
    { route: '/resources',                 changeFreq: 'monthly', priority: 0.65, date: '2026-07-01' },
    { route: '/privacy',                   changeFreq: 'yearly',  priority: 0.4,  date: '2026-07-31' },
    { route: '/terms',                     changeFreq: 'yearly',  priority: 0.4,  date: '2026-07-31' },
    { route: '/open-source',               changeFreq: 'monthly', priority: 0.5,  date: '2026-07-01' },
  ].map(({ route, changeFreq, priority, date }) => ({
    url: `${baseUrl}${route}`,
    lastModified: date,
    changeFrequency: changeFreq,
    priority,
  }));

  // Dynamic Country Regional Routes (5 Target Regions)
  const countryRoutes = countryData.map((c) => ({
    url: `${baseUrl}/country/${c.slug}`,
    lastModified: '2026-07-01',
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Dynamic Programmatic Role Template Routes (30 Professions)
  const programmaticTemplateRoutes = rolesData.map((role) => ({
    url: `${baseUrl}/templates/${role.slug}`,
    lastModified: '2026-07-28',
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Programmatic Role Example Routes (30 Professions)
  const programmaticExampleRoutes = rolesData.map((role) => ({
    url: `${baseUrl}/examples/${role.slug}`,
    lastModified: '2026-07-28',
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Programmatic Cover Letter Routes (30 Professions)
  const programmaticCoverLetterRoutes = rolesData.map((role) => ({
    url: `${baseUrl}/cover-letter/${role.slug}`,
    lastModified: '2026-07-28',
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Blog Post Routes — use post's publishDate for accurate freshness signals
  const blogRoutes = blogPostsData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.modifiedDate || post.publishDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...countryRoutes,
    ...programmaticTemplateRoutes,
    ...programmaticExampleRoutes,
    ...programmaticCoverLetterRoutes,
    ...blogRoutes,
  ];
}