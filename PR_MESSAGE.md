# Improve blog/portfolio SEO, i18n, a11y, and performance

Branch: `improve/blog-portfolio-seo-fixes`
Base: `master`

Comprehensive improvements addressing SEO, i18n correctness, accessibility, performance, dead code, and the build toolchain for the ezeluduena.dev.ar blog-portfolio. Derived from a full codebase audit. `tsc --noEmit` and `SITE_URL=https://ezeluduena.dev.ar yarn build` both pass; the exported `out/` site was verified to contain the per-locale feeds, sitemap, canonical/Twitter/JSON-LD tags, and the English post's English description.

Diff: **37 files changed, +615 / −3335** across 15 commits.

---

## Critical fixes

### Production `SITE_URL` resolved to `localhost:3000`
The GitHub Actions workflows never set `SITE_URL`, so every RSS link, OpenGraph image URL, and canonical reference in the build output pointed at `http://localhost:3000`. This broke RSS readers and social sharing previews in production.

- Pass `SITE_URL=https://ezeluduena.dev.ar` to the build in both `.github/workflows/nextjs.yml` and `.github/workflows/redeploy.yml`.
- Verified `out/blog/{en,es}/rss.xml` links now use the production host.

### English RSS feed was never generated
Only the Spanish blog loader was used; the single `public/blog/rss.xml` was filled with Spanish posts, and the blog index rendered Spanish-sourced metadata for both locales.

- Extract a shared `createBlogLoader(locale)` factory in `data/blog/_loader.ts`; `data/blog/{en,es}/index.ts` now re-export it (removes ~300 lines of duplication).
- `publishBlogFeed(locale)` writes to `public/blog/{locale}/rss.xml`, so English and Spanish readers each get a feed in their language.
- `pages/blog/index.tsx` loads both EN and ES refs, renders the list for the active locale, and links to the matching locale feed.
- Blog post pages point `rssUrl` at their own locale's feed.
- The ES loader now also validates `comment_section_title` (previously only the EN loader did).

### English post had a Spanish frontmatter `description`
`data/blog/en/poniendo_a_trabajar_a_los_numeros/index.md` had a Spanish `description` in frontmatter, which flowed into the meta description and OpenGraph `description` — a Spanish social preview for an English-language post. Replaced it with an English translation.

### Language switcher auto-redirected first-time visitors away from English URLs
The effect aligned the URL with the resolved locale on every navigation. Because the default locale is `'es'` (with no stored preference), a first-time visitor opening a shared `/blog/en/...` link was bounced/relabeled based on a preference they never set, making English URLs unstable.

- Only redirect when the user has an *explicit* stored preference.
- Redirect to the preferred locale's equivalent post instead of silently overwriting the preference.
- Scope the path rewrite to the `/blog/<locale>` segment (avoids replacing an `en`/`es` substring inside a post id).
- Pass numeric `width`/`height` plus an `aria-label` and descriptive alt text to the flag button.

---

## SEO

- `components/meta.tsx` now derives the canonical URL from the current route and emits `<link rel="canonical">` and `og:url` (stable, absolute URLs per page).
- Twitter Card tags (`twitter:card`/`title`/`description`/`image`), using `summary_large_image` when a cover image is present.
- For blog posts: `og:type=article` plus `article:published_time` and `article:author`, plus `BlogPosting` JSON-LD structured data. `WebSite` and `Person` JSON-LD are emitted on every page.
- `og:image:alt` support.
- Only render the RSS `<link>` when an `rssUrl` is actually provided (was previously rendered with an `undefined` href).
- Drop the unused `imageLayout` prop that computed a value never emitted; blog post pages now pass `publishedTime`, `author`, and `imageAlt` instead.
- Generate `sitemap.xml` (static routes + every EN/ES blog post with `lastmod`) via `utils/sitemap.ts`, written at build time alongside the RSS feeds. Commit a static `public/robots.txt` allowing all crawlers and pointing at the production sitemap. The generated `public/sitemap.xml` is gitignored.
- `pages/_document.tsx` renders `<html lang="es">` (with `suppressHydrationWarning`) and inlines a tiny script which, before first paint, reads the stored theme/locale (falling back to `prefers-color-scheme` and `navigator.language`) and applies the `dark` class and `lang` attribute on `<html>`. Removes the flash of light mode for dark-mode users and gives screen readers/search engines a correct language on load. `Page` (layout) syncs `document.documentElement`'s dark class and lang attribute from the live theme/locale.

---

## Internationalization

- The header nav hardcoded `'home'` and `'blog'` while `'projects'` and `'talks'` were localized. Added `home`/`blog` keys to the layout translations (es: `inicio`/`blog`, en: `home`/`blog`) and drive all four labels from the dictionary.

---

## Accessibility

- Theme switcher and mobile-menu buttons now expose localized `aria-label`s; the mobile-menu button also sets `aria-expanded` and `aria-controls`, and the mobile nav gets `id="mobile-nav"`.
- Icon-only controls hide their icons from screen readers with `aria-hidden`.
- Add a skip-to-content link (targeted at `<main id="main">`) that appears on focus, letting keyboard users bypass the header.
- Replace generic alt text with descriptive values: the homepage logo (`Ezequiel Ludueña`) and each blog post cover (the post title + `cover`/`portada`).

---

## Performance

The homepage renders `logo-trans.png` with `priority` but the file was a 3.4 MB 1482×1483 PNG, dominating LCP. Next/Image optimization is off (static export), so compress at the source:

| Asset | Before | After |
| --- | --- | --- |
| `public/logo.png` | 3.4 MB (1482×1483) | 530 KB (1199×1200) |
| `public/logo-trans.png` | 3.4 MB (1482×1483) | 128 KB (600×600) |
| `la_cosa` cover.png (en+es) | 484 KB | 105 KB |
| `poniendo...` cover.png (en+es) | 909 KB | 128 KB |

All covers stay within the 800×450 box used by the post page, so layout is unaffected.

---

## Markdown / styling

- Add `table`/`thead`/`tr`/`th`/`td` overrides in the Markdown renderer so tables get borders, padding, and a dark-mode palette instead of the default unstyled Tailwind-reset look.
- Syntax highlighter picks the Prism theme from `useTheme()` (`one-dark` for dark mode, `tomorrow` for light mode) so code blocks no longer stay light-on-light in dark mode.
- Simplify the Markdown `img` handler: drop the commented-out return and the dead `URL.createObjectURL` branch (`react-markdown` always passes a string src), keeping a type-safe string coercion.

---

## Dead code & dependencies removed

Dead code:
- Delete `components/listItem.tsx` (never imported).
- Drop unused `distinctBy` (`utils/array.ts`) and `formatUrlWithQuery` (`utils/url.ts`).
- Remove the unused `GrLanguage` import (`layout.tsx`) and unused `Link` imports in both blog post pages.
- Remove junk imports `time` from `console` (`public/locale/blog.ts`) and `url` from `inspector` (`public/locale/projects.ts`) — which also leaked into the served static locale files.

Dependencies:
- Remove `@babel/core@^8` (non-existent major, not referenced), `next-pwa` (unmaintained, never wired into `next.config`), `@svgr/webpack`, `html-react-parser`, `minimatch` (none referenced in source).
- Remove `@octokit/graphql` and `@octokit/rest` devDependencies (unused).
- Remove `autoprefixer` (redundant under TailwindCSS v4, which ships its own prefixing via Lightning CSS) and drop it from `postcss.config.js`.

---

## Config / PWA / docs

- `next.config.js`: drop the stale `staticPageGenerationTimeout` hack and its "Pulling donations takes a very long time" comment (refers to an upstream feature that does not exist here), the no-op `experimental.turbopack:false` flag, and the legacy webpack SVG `url-loader` rule (Turbopack handles `*.svg` imports natively; the `*.svg` string module declaration in `types.d.ts` is retained).
- Correct the manifest icon size typo `125x128` → `128x128`.
- Remove `pages/_offline.tsx`, the offline-fallback page that only made sense with `next-pwa` and is not linked anywhere; drop the stale `next-pwa` ignore rules from `.gitignore`.
- Fix the README LinkedIn link, which was missing its `https://` scheme and resolved to a relative path.

---

## CI

- Add a `typecheck` script (`tsc --noEmit`) and a CI step that runs it before the build for earlier, faster feedback.
- Align the nightly redeploy workflow to Node 24 to match the push workflow (it was on Node 20).

---

## Build toolchain (discovered during verification)

Removing `experimental.turbopack:false` (no-op noise) surfaced that Next 16 enables Turbopack by default and rejects custom `webpack` configs — the flag had been silently forcing webpack. The only reason for the custom rule was inlining locale-flag SVGs via `url-loader`.

- Remove the `webpack(config)` SVG rule from `next.config.js`; the build passes with no turbopack config needed.
- Remove the now-unused `file-loader`, `url-loader`, and `webpack` dependencies.
- Add `lodash` as an explicit devDependency: `markdown-to-txt` does `require('lodash')` without declaring it, and it previously only resolved because `next-pwa → workbox-build` hoisted `lodash`. Removing `next-pwa` exposed this latent bug and broke `next build`.

---

## Verification

```
tsc --noEmit                                                  # EXIT 0
SITE_URL=https://ezeluduena.dev.ar yarn build                 # EXIT 0, 12 static pages
```

Spot-checks in `out/`:
- `out/blog/en/rss.xml` and `out/blog/es/rss.xml` exist, 3 items each, links use `https://ezeluduena.dev.ar`.
- `out/sitemap.xml` contains 10 URLs on the production host; `out/robots.txt` present.
- `out/blog/en/poniendo_a_trabajar_a_los_numeros.html`: `<link rel="canonical">`, `og:url`, `twitter:card=summary_large_image`, `og:type=article`, `article:published_time`, `article:author`, `BlogPosting` JSON-LD, English meta description.
- `<html lang="es">` on the rendered home and post pages (the no-flash script switches this on load).
- Stale `public/blog/rss.xml` removed.

---

## Not in scope (left for follow-up)

- No `/about` page, contact form, resume/CV download, blog search, or tags/categories.
- Vercel Analytics is included but the site deploys to GitHub Pages, so it won't collect data for the production domain.
- Talks still have `// TODO: add talk blog` links pointing at `/talks` itself.
- No tests yet (started a `typecheck` step; unit/E2E tests are a natural next PR).
- i18n `.ts` files still live under `public/locale/` and are served as static assets (anti-pattern) — moving them is a structural change left for a follow-up.

---

## Commits

1. `ci: set SITE_URL, align Node version, and add type check step`
2. `fix(blog): generate per-locale RSS feeds and load posts per locale`
3. `fix(content): translate English post description in 'poniendo_a_trabajar_a_los_numeros'`
4. `feat(seo): add canonical URLs, Twitter cards, JSON-LD, and article meta`
5. `feat(a11y/seo): add <html lang> and a no-flash theme script`
6. `feat(seo): generate sitemap.xml and add robots.txt`
7. `fix(i18n): stop auto-redirecting first-time visitors away from English URLs`
8. `chore: remove dead code and unused dependencies`
9. `feat(a11y): add aria-labels, skip-to-content link, and descriptive alt text`
10. `feat(markdown): style tables and support dark-mode code blocks`
11. `chore(config): clean up next.config.js`
12. `chore(pwa): fix manifest icon size and drop unused PWA scaffolding`
13. `feat(i18n): localize nav labels and fix README LinkedIn link`
14. `perf(assets): compress logo and blog cover images`
15. `fix(build): migrate to Turbopack and declare missing lodash dep`