import type { APIRoute } from 'astro';

export const prerender = true;

/**
 * Generated rather than kept in public/ because the sitemap URL has to be
 * absolute, and every clinic runs on a different domain. `site` comes from
 * process.env.URL, which Netlify sets per site at build time.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site ? new URL('sitemap-index.xml', site).href : '/sitemap-index.xml';

  const body = `User-agent: *
Allow: /

# The CMS shell is not content and should not appear in search results.
Disallow: /admin/

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
