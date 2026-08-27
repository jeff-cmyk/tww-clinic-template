// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  // Netlify sets URL to the site's primary address at build time, so every clinic
  // gets correct canonical, OG and schema.org URLs without any per-site config.
  site: process.env.URL ?? 'http://localhost:4321',
  adapter: netlify(),
});
