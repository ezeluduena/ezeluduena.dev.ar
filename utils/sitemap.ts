import fs from 'fs/promises';
import path from 'path';
import { getSiteUrl } from '~/utils/env';

type SitemapEntry = {
  loc: string;
  lastmod?: string;
};

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const publishSitemap = async (entries: SitemapEntry[]) => {
  const filePath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

  const body = entries
    .map((entry) => {
      const loc = `  <loc>${escapeXml(getSiteUrl(entry.loc))}</loc>`;
      const lastmod = entry.lastmod ? `\n  <lastmod>${entry.lastmod}</lastmod>` : '';
      return ` <url>\n${loc}${lastmod}\n </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.rm(filePath, { force: true });
  await fs.writeFile(filePath, xml);
};