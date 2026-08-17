# AGENTS.md

Context for AI code agents working on **ezeluduena.dev.ar** — a personal portfolio and blog website built with Next.js 16, React 19, TypeScript, and TailwindCSS v4, deployed as a static export to GitHub Pages.

## Commands

```bash
yarn install              # install deps (yarn classic, frozen-lockfile in CI)
yarn start                # dev server at localhost:3000 (next dev)
yarn build                # static export to ./out (set SITE_URL for canonical URLs)
yarn typecheck            # tsc --noEmit
yarn lint                 # eslint .
yarn format               # prettier --write .
yarn format:check         # prettier --check . (CI gate)
```

Production build requires `SITE_URL` (throws if missing):

```bash
SITE_URL=https://ezeluduena.dev.ar yarn build
```

## Tech stack

| Package                  | Version | Notes                                                           |
| ------------------------ | ------- | --------------------------------------------------------------- |
| next                     | ^16.3.1 | Static export (`output: 'export'`), Turbopack                   |
| react                    | ^19.2.8 |                                                                 |
| typescript               | ^6.0.3  | **Must stay <7** — TS 7 breaks `next build`                     |
| tailwindcss              | ^4.3.3  | v4 via `@tailwindcss/postcss`, `@custom-variant dark`           |
| eslint                   | ^9.39.5 | **Must stay <10** — eslint-config-next plugins don't support 10 |
| eslint-config-next       | ^16.3.0 | Flat config, ships `core-web-vitals` + `typescript`             |
| prettier                 | ^3.9.6  | With `prettier-plugin-organize-imports`                         |
| lint-staged              | ^16     | **Must stay <17** — v17 requires Node ≥22.22                    |
| husky                    | ^9.1.7  | Pre-commit hook                                                 |
| feed                     | ^6.0.0  | RSS generation (ESM)                                            |
| react-markdown           | ^10.1.0 | Blog post rendering                                             |
| react-syntax-highlighter | ^16.1.1 | Prism, dark/light themes                                        |
| @giscus/react            | ^3.1.0  | Blog comments via GitHub Discussions                            |

Node: `.nvmrc` = `24` (CI), local dev = Node 20.19.3. `engines.node` = `>=20.9.0`.

## Project structure

```
components/    UI components (PascalCase .tsx)
data/          Content + loaders
  blog/        Per-locale markdown posts + _loader.ts factory
  locale/      i18n translation tables (home, layout, blog, projects, talks)
  projects/    Project metadata
  talks/       Talk metadata (Spanish content)
hooks/         Custom React hooks (camelCase .ts)
pages/         Next.js Pages Router routes
utils/         Pure helpers (env, sitemap, array, async, object, url)
public/        Static assets (blog/ and sitemap.xml are gitignored — generated at build)
.github/       CI workflows + dependabot
.husky/        Git hooks (pre-commit → lint-staged)
```

Path alias: `~/*` → repo root (e.g. `~/components/layout`, `~/hooks/useLocale`).

## Architecture

### i18n (client-side, no SSR locale)

- **Locales:** `'en' | 'es'`, default `'es'`.
- **Translation tables:** `data/locale/{home,layout,blog,projects,talks}.ts` — objects keyed by locale.
- **`useLocale` hook:** resolves locale as `userPreferredLocale` (localStorage) → `window.__INITIAL_LOCALE` (from no-flash script) → `systemPreferredLocale` (`matchMedia('(prefers-language: en)')`) → `'es'`.
- **No-flash script** (`pages/_document.tsx`): inline `<script>` runs before paint, reads `localStorage.theme`/`locale`, falls back to `matchMedia`, sets `document.documentElement.lang` + `.dark` class, and sets `window.__INITIAL_LOCALE`.
- **Language switcher:** toggles locale, redirects `/blog/{old}` → `/blog/{new}`. Only re-aligns URL to stored preference when `userPreferredLocale !== null` (first-time visitors keep shared links stable).
- **Known limitation:** `og:locale` shows `es_AR` on EN pages in static build (locale resolved client-side; would need SSG per-locale to fix).

### Blog

- **Factory loader** (`data/blog/_loader.ts`): `createBlogLoader(locale)` returns `{ loadBlogPosts, loadBlogPostRefs, loadBlogPost, publishBlogPostAssets, publishBlogFeed }`.
- **Posts:** `data/blog/{en,es}/<id>/index.md` with frontmatter `{ title, date, description, comment_section_title }` (all required). Covers: `cover.png` in the same folder.
- **RSS:** `publishBlogFeed` writes `public/blog/{locale}/rss.xml` (gitignored, generated at build). Title/description localized per locale.
- **Sitemap:** `publishSitemap` (called from `pages/blog/index.tsx` getStaticProps) writes `public/sitemap.xml` with hreflang alternates for blog posts.
- **Comment section:** Giscus via `@giscus/react`, keyed by `comment_section_title`, theme tracks `userPreferredTheme`.

### SEO meta (`components/meta.tsx`)

- Canonical URL from `router.asPath` (stripped of `?`/`#`).
- Open Graph: `og:type` (article/website), `og:locale` (`es_AR`/`en_US`), `og:locale:alternate` for other hreflang locales.
- Twitter cards: `summary` or `summary_large_image`.
- hreflang: `<link rel="alternate" hrefLang>` for blog posts (both en/es).
- JSON-LD: `WebSite` + `Person` (with `sameAs`) always; `BlogPosting` when `publishedTime` (with `dateModified`, `publisher`, `author`).
- Default description is locale-aware (`defaultDescriptions[locale]`).
- RSS link title localized.

### Layout (`components/layout.tsx`)

- `Layout` wraps `<Meta/>` + `Page`. `Page` syncs `.dark` class + `lang` on `<html>`.
- `Header`: skip-to-content link, desktop nav, `ThemeSwitcher` (sun/moon), `LanguageSwitcher` (flags), mobile hamburger.
- `Loader`: progress bar shown after 300ms of navigation loading.
- `Main`: wraps children in `FadeIn` keyed by `router.pathname`.
- `FadeIn`: staggered opacity/translate; respects `prefers-reduced-motion`.

### Projects (`data/projects/index.ts` + `pages/projects/index.tsx`)

- **Data model:** `Project = { id, categories: ProjectCategory[], technologies: string[], homepageUrl? }`.
- **Categories:** `'odoo' | 'data-science' | 'backend' | 'web'`.
- **Nested i18n:** `data/locale/projects.ts` → `{ en: { title, description, categories: {...}, projects: { '<id>': { name, description, url } } }, es: {...} }`.
- **Filter tabs:** client-side `useState`, tabs from locale categories, active tab styled cyan.
- **Cards:** name, description, tech chips, optional homepage link.

### Talks (`data/talks/index.ts` + `pages/talks/index.tsx`)

- **Data model:** `Talk = { name, url?, description?, date?, event?, event_url?, video_url?, slides_url?, with?, language? }`. Content authored in Spanish.
- **Translation pattern:** `data/locale/talks.ts` maps Spanish strings → English. Page renders `t[string] || string` (fallback to original).
- Slides PDFs in `public/talks/`.

## Configuration

### `next.config.js` (CJS)

- `output: 'export'`, `images.unoptimized: true`, `reactStrictMode: true`.
- `env.BUILD_ID`: `git rev-parse --short HEAD` + tag at HEAD.
- `env.SITE_URL`: `process.env.SITE_URL` → `VERCEL_URL` → `http://localhost:3000`.
- Uses `require()` with `/* eslint-disable @typescript-eslint/no-require-imports */`.

### `tsconfig.json`

- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitReturns: true`.
- Path alias: `"~/*": ["./*"]`.
- `moduleResolution: bundler`, `jsx: react-jsx`, `isolatedModules: true`.

### `eslint.config.mjs` (flat config)

- Imports `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. No custom rules.

### `.prettierrc.json`

- `singleQuote`, `semi`, `tabWidth: 2`, `printWidth: 100`, `trailingComma: "none"`, `arrowParens: "always"`.
- Plugin: `prettier-plugin-organize-imports`.
- `.prettierignore`: `next.config.js`, `postcss.config.js`, `yarn.lock`, `public/`, `out/`, `.next/`.

### `pages/globals.css`

- Responsive root font sizes (18px → 16px → 14px).
- `@import 'tailwindcss';` + `@custom-variant dark (&:where(.dark, .dark *));`.

## CI/CD

### `nextjs.yml` — GitHub Pages deploy

- Trigger: `push` on `master`. Node 24.
- Gates: `yarn install --frozen-lockfile` → `typecheck` → `lint` → `format:check` → `next build` (with `SITE_URL`).
- Writes `out/CNAME` (`ezeluduena.dev.ar`), deploys via GitHub Pages.

### `redeploy.yml` — daily cron

- Same deploy, skips typecheck/lint/format gates.

### `codeql.yml` — CodeQL

- `javascript-typescript`, `build-mode: none`, weekly cron.

### `.github/dependabot.yml`

- Monthly, grouped. **Ignore rules:** `eslint >=10`, `lint-staged >=17`, `typescript >=7`.

## Git hooks

- `.husky/pre-commit` → `npx lint-staged`.
- `lint-staged`: `*.{js,jsx,ts,tsx,mjs}` → `eslint --fix` + `prettier --write`; `*.{json,css,md,yml}` → `prettier --write`.

## Key constraints

1. **TypeScript <7** — TS 7 drops `lib/typescript.js`, breaks `next build`.
2. **ESLint <10** — eslint-config-next's bundled plugins crash on ESLint 10.
3. **lint-staged <17** — v17 requires Node ≥22.22, local is Node 20.
4. **Static export — no SSR.** Locale/theme resolved client-side. `og:locale` may not match user's locale in static HTML.
5. **`images.unoptimized: true`** — no `next/image` optimization.
6. **`public/blog/` and `public/sitemap.xml` are gitignored** — generated at build time, never commit them.
7. **`deleteUndefined` required** before returning `getStaticProps` data (Next.js can't serialize `undefined`).
8. **`noUncheckedIndexedAccess`** — indexed access returns `T | undefined`; use `??` / `||` fallbacks.
9. **`basePath` injected by CI** (`actions/configure-pages`), not in `next.config.js`.

## Conventions

- **Imports:** `~/` path alias, never relative across folders.
- **Style:** single quotes, semicolons, 2-space indent, no trailing commas, `printWidth 100`.
- **Components:** camelCase filenames, PascalCase components, `FC`/`PropsWithChildren`.
- **Hooks/utils/data:** camelCase `.ts`.
- **Styling:** `classnames` (`import c from 'classnames''`) with object-conditional classes; dark mode via `.dark` class.
- **Icons:** `react-icons/fi` (Feather).
- **Focus-visible:** interactive elements use `focus-visible:ring-2 ring-cyan-500 ring-offset-2`.

## Content authoring

### Blog post

1. Create `data/blog/{en,es}/<id>/index.md` with frontmatter `{ title, date, description, comment_section_title }`.
2. Place `cover.png` in the same folder.
3. Add any non-markdown assets (PDFs, images) in the same folder — they're copied to `public/blog/{locale}/<id>/`.
4. Run `yarn build` to regenerate RSS, sitemap, and copied assets.

### Project

1. Add to `data/projects/index.ts`: `{ id, categories, technologies, homepageUrl? }`.
2. Add `data/locale/projects.ts` → `projects[id] = { name, description, url }` under both `en` and `es`.
3. Add new categories to `ProjectCategory` type and `t.categories` in both locales.

### Talk

1. Add to `data/talks/index.ts` (Spanish content).
2. Add Spanish strings as keys under `en` in `data/locale/talks.ts` with English translations.
3. Place slides in `public/talks/`.
