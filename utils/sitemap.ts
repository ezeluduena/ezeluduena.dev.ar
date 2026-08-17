import fs from 'fs/promises';
import path from 'path';
import { getSiteUrl } from '~/utils/env';

type SitemapHreflang = {
  locale: string;
  url: string;
};

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  alternates?: SitemapHreflang[];
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const publishSitemap = async (entries: SitemapEntry[]) => {
  const filePath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

  const body = entries
    .map((entry) => {
      const loc = `  <loc>${escapeXml(getSiteUrl(entry.loc))}</loc>`;
      const lastmod = entry.lastmod ? `\n  <lastmod>${entry.lastmod}</lastmod>` : '';
      const alternates = entry.alternates
        ? '\n' +
          entry.alternates
            .map(
              (a) =>
                `  <xhtml:link rel="alternate" hreflang="${a.locale}" href="${escapeXml(getSiteUrl(a.url))}" />`
            )
            .join('\n')
        : '';
      return ` <url>\n${loc}${lastmod}${alternates}\n </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.rm(filePath, { force: true });
  await fs.writeFile(filePath, xml);
};
