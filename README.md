# The Wellness Way — Clinic Site Template

A ready-to-launch clinic website. One markdown file drives the entire site, and
clinic staff edit it themselves through a browser admin panel — change the phone
number once and it updates the nav, the footer, the contact page, and the
structured data Google reads.

**Stack:** [Astro](https://astro.build) 5 · [Decap CMS](https://decapcms.org) · Netlify

---

## Launch a new clinic

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jeff-cmyk/tww-clinic-template)

That button copies this template into a new GitHub repo, creates a Netlify site,
and deploys it. Three clicks and the site is live with blank placeholder content.

Four steps remain, and they have to be done by hand — **Netlify has no API for
enabling Identity or Git Gateway**, so no script can do them for you.

### 1. Turn on Identity
Site configuration → **Identity** → Enable.

### 2. Set registration to invite-only
Identity → Registration → **Invite only**.

> Skipping this leaves the admin panel open to public signup. Anyone who finds
> the URL could register and edit a medical clinic's website. Do not skip it.

### 3. Turn on Git Gateway
Identity → Services → **Enable Git Gateway**.

> Git Gateway is [deprecated](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/).
> It still works and existing sites are unaffected, but Netlify no longer fixes
> bugs in it. It is what lets the CMS commit to the repo, so it is required until
> the template moves to a different auth backend.

### 4. Invite the clinic's staff
Identity → **Invite users** → their email. They will get a confirmation link.

Then hand them `https://<their-site>/admin/` and they can fill in the site
themselves. Optionally add a custom domain under Domain management.

---

## Filling in a new site

Every field starts as a placeholder. Working through the admin panel top to
bottom covers it, but these are the ones that cause real problems when missed:

| Field | What happens if you leave it |
| :---- | :--------------------------- |
| **Scheduling → NEO URL** | Every "Schedule Appointment" button silently falls back to the contact page or a phone link. Nothing errors — the CTAs just quietly stop reaching your booking system. |
| **Address → Latitude / Longitude** | Default `0, 0` places the clinic in the Atlantic Ocean in the structured data Google reads. |
| **Tracking → GA4 / Meta Pixel** | Left blank, no analytics tags are output at all. |
| **Hero → Background Image** | Also used as the social share image. Without it, shares fall back to the logo. |

---

## How the content works

All content lives in **one file**: `src/content/clinic/clinic.md`.

Its shape is enforced by a Zod schema in `src/content/config.ts`. If a required
field is missing, **the build fails** rather than deploying a broken page — a
deliberate guardrail, since non-technical staff edit this directly. A failed
build never takes the live site down; Netlify keeps serving the last good deploy.

The admin panel's fields are defined separately in `public/admin/config.yml`.

> ⚠️ **Keep those two files in sync.** `config.ts` decides what is valid;
> `config.yml` decides what staff can enter. Add a required field to the schema
> without adding it to the CMS and staff cannot produce a valid site.

The collection is deliberately single-entry — one repo and one Netlify site per
clinic. `create: false` stops staff adding a second one.

### Landing pages

Each entry under **Landing Pages** generates a page at `/lp/<slug>`, rendered by
`src/pages/lp/[slug].astro`. Slugs are normalized automatically
(`Neuropathy Relief` → `neuropathy-relief`); blank and duplicate slugs are
skipped rather than failing the build. `/new-patient` is a fixed landing page
using the same layout.

---

## Local development

```bash
npm install
```

```bash
npm run dev
```

Runs at `http://localhost:4321`.

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build |

**On Windows:** stop the dev server before switching git branches. Astro's file
watcher holds directory handles, and Windows refuses to delete a directory that
any process has open — branch switches that add or remove folders will fail.

**Local `/admin`:** use `http://localhost:4321/admin/index.html`. Astro's dev
server does not resolve the bare `/admin` directory index; Netlify does in
production. You cannot log in locally in any case — Identity and Git Gateway
only exist on the deployed site.

---

## Project structure

```text
public/
  admin/          Decap CMS (config.yml defines the admin panel's fields)
  images/clinic/  CMS-uploaded media
  _headers        Security headers applied by Netlify
src/
  components/     Nav, Footer, LandingPage, RichText, BioModal
  content/
    clinic/       ← the single content file that drives the whole site
    config.ts     Zod schema validating that file
  layouts/        BaseLayout — meta tags, schema.org, analytics
  pages/          One file per route
  styles/         global.css — design tokens and shared classes
netlify.toml      Build settings (overrides the Netlify UI)
```

Canonical, Open Graph and schema.org URLs derive from `process.env.URL`, which
Netlify sets per site at build time — so each clinic gets correct absolute URLs
with no configuration. Local builds fall back to `http://localhost:4321`.
