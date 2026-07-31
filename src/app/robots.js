export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://esayresume.netlify.app';

  return {
    rules: [
      {
        // All standard search engine crawlers — full access except private/dynamic routes
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/_next/', '/export/', '/builder?*'],
      },
      {
        // Block AI training crawlers — they scrape content without providing link equity
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Bytespider',
          'CCBot',
          'Amazonbot',
          'anthropic-ai',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
