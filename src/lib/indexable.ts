/**
 * Whether this build should be visible to search engines.
 *
 * A site is publicly reachable the moment the deploy button finishes, while it
 * still says "Clinic Name" and "(000) 000-0000". That placeholder version must
 * not get indexed, or it competes with the real site once the clinic's domain
 * goes live.
 *
 * Rather than a switch someone has to remember, this keys off the address the
 * site is actually served on. A clinic stays hidden while it lives on a
 * *.netlify.app URL and becomes indexable by itself on the next build after a
 * custom domain is set — which is also roughly when the content is ready.
 *
 * Deploy previews and branch deploys are never indexable.
 */
export function isIndexable(site: URL | undefined): boolean {
  // Netlify sets CONTEXT to production, deploy-preview or branch-deploy.
  // Absent locally, where indexing is moot anyway.
  const context = process.env.CONTEXT;
  if (context && context !== 'production') return false;

  if (!site) return false;

  const host = site.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.local')) return false;

  // Still on the temporary Netlify address, so no custom domain yet.
  if (host.endsWith('.netlify.app')) return false;

  return true;
}
