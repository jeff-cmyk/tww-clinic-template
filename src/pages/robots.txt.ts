import type { APIRoute } from 'astro';
import { isIndexable } from '../lib/indexable';

export const prerender = true;

/**
 * Generated rather than kept in public/ for two reasons: the sitemap URL has to
 * be absolute and every clinic runs on its own domain, and a site that has not
 * been given its real domain yet must not be indexed at all.
 */
export const GET: APIRoute = ({ site }) => {
  const indexable = isIndexable(site);

  if (!indexable) {
    return new Response(
      `# This site has not been given its real domain yet, so it is still showing
# placeholder content. Search engines are blocked until then, otherwise the
# unfinished version competes with the real site once it launches.
#
# Nothing to do: add the clinic's custom domain in Netlify and this file lets
# search engines back in on the next build.

User-agent: *
Disallow: /
`,
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const sitemapUrl = new URL('sitemap-index.xml', site).href;

  return new Response(
    `User-agent: *
Allow: /

# The CMS shell is not content and should not appear in search results.
Disallow: /admin/

Sitemap: ${sitemapUrl}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
