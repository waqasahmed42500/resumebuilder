import { blogPostsData } from "./blog/blogPostsData";
import { countryData } from "./country/countryData";
import { siteConfig } from "./lib/seo";
import { rolesData } from "./templates/roleData";

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    { route: "", changeFrequency: "daily", priority: 1.0, lastModified: "2026-08-03" },
    { route: "/builder", changeFrequency: "daily", priority: 0.95, lastModified: "2026-08-03" },
    { route: "/templates", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-08-03" },
    { route: "/pricing", changeFrequency: "monthly", priority: 0.75, lastModified: "2026-08-03" },
    { route: "/contact", changeFrequency: "yearly", priority: 0.5, lastModified: "2026-08-03" },
    { route: "/privacy", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-08-03" },
    { route: "/terms", changeFrequency: "yearly", priority: 0.4, lastModified: "2026-08-03" },
    { route: "/ats-resume-builder", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-08-03" },
    { route: "/examples", changeFrequency: "weekly", priority: 0.85, lastModified: "2026-08-03" },
    { route: "/cover-letter", changeFrequency: "weekly", priority: 0.85, lastModified: "2026-08-03" },
    { route: "/blog", changeFrequency: "daily", priority: 0.8, lastModified: "2026-08-03" },
    { route: "/country", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-03" },
    { route: "/resources", changeFrequency: "monthly", priority: 0.65, lastModified: "2026-08-03" },
    { route: "/open-source", changeFrequency: "monthly", priority: 0.5, lastModified: "2026-08-03" },
    { route: "/Profolio", changeFrequency: "daily", priority: 0.9, lastModified: "2026-08-06" },
    { route: "/Profolio/tempelate", changeFrequency: "weekly", priority: 0.85, lastModified: "2026-08-06" },
  ];

  const countryRoutes = countryData.map((country) => ({
    route: `/country/${country.slug}`,
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-08-03",
  }));

  const roleTemplateRoutes = rolesData.map((role) => ({
    route: `/templates/${role.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-08-03",
  }));

  const roleExampleRoutes = rolesData.map((role) => ({
    route: `/examples/${role.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: "2026-08-03",
  }));

  const coverLetterRoutes = rolesData.map((role) => ({
    route: `/cover-letter/${role.slug}`,
    changeFrequency: "weekly",
    priority: 0.75,
    lastModified: "2026-08-03",
  }));

  const blogRoutes = blogPostsData.map((post) => ({
    route: `/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: post.modifiedDate || post.publishDate,
  }));

  return [
    ...staticRoutes,
    ...countryRoutes,
    ...roleTemplateRoutes,
    ...roleExampleRoutes,
    ...coverLetterRoutes,
    ...blogRoutes,
  ].map(({ route, lastModified, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
