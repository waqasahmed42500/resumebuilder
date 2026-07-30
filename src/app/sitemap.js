import { rolesData } from './templates/roleData';
import { blogPostsData } from './blog/blogPostsData';
import { countryData } from './country/countryData';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

  // Core Static Routes
  const staticRoutes = [
    '',
    '/builder',
    '/templates',
    '/examples',
    '/cover-letter',
    '/country',
    '/open-source',
    '/blog',
    '/resources',
    '/ats-resume-builder',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/builder' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.9,
  }));

  // Dynamic Country Regional Routes (5 Target Regions)
  const countryRoutes = countryData.map((c) => ({
    url: `${baseUrl}/country/${c.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Programmatic Role Template Routes (30 Professions)
  const programmaticTemplateRoutes = rolesData.map((role) => ({
    url: `${baseUrl}/templates/${role.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Programmatic Role Example Routes (30 Professions)
  const programmaticExampleRoutes = rolesData.map((role) => ({
    url: `${baseUrl}/examples/${role.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Programmatic Cover Letter Routes (30 Professions)
  const programmaticCoverLetterRoutes = rolesData.map((role) => ({
    url: `${baseUrl}/cover-letter/${role.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Blog Post Routes
  const blogRoutes = blogPostsData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
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