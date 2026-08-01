import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { getBuildId, getSiteUrl } from '~/utils/env';

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  imageUrl?: string;
  imageAlt?: string;
  rssUrl?: string;
  publishedTime?: string;
  author?: string;
};

const siteName = 'Ezequiel Ludueña';
const defaultAuthor = 'Ezequiel Ludueña';
const defaultDescription =
  'Ezequiel Ludueña - Estudiante de Licenciatura en Ciencias de la Computación en la FAMAF de la UNC.';

const Meta: FC<MetaProps> = ({
  title,
  description,
  keywords,
  imageUrl,
  imageAlt,
  rssUrl,
  publishedTime,
  author
}) => {
  const router = useRouter();
  const buildId = getBuildId();

  const actualTitle = title ? title + ' • ' + siteName : siteName;
  const actualDescription = description || defaultDescription;
  const actualKeywords = keywords?.join(',') || '';
  const actualImageUrl = getSiteUrl(imageUrl || '/logo.png');
  const actualRssUrl = rssUrl && getSiteUrl(rssUrl);
  const canonicalUrl = getSiteUrl(router.asPath || '/');
  const twitterCard = imageUrl ? 'summary_large_image' : 'summary';

  const personLd = {
    '@type': 'Person',
    name: siteName,
    url: getSiteUrl(),
    image: getSiteUrl('/logo.png'),
    sameAs: ['https://github.com/ezeluduena', 'https://rebel.ar/@ezeluduena']
  };

  const websiteLd = {
    '@type': 'WebSite',
    name: siteName,
    url: getSiteUrl(),
    author: { '@type': 'Person', name: siteName }
  };

  const articleLd = publishedTime
    ? {
        '@type': 'BlogPosting',
        headline: title,
        description: actualDescription,
        image: actualImageUrl,
        datePublished: publishedTime,
        author: { '@type': 'Person', name: author || defaultAuthor },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }
      }
    : null;

  return (
    <Head>
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />

      <title key="title">{actualTitle}</title>

      <link key="icon" rel="icon" href="/favicon.png" />
      <link key="manifest" rel="manifest" href="/manifest.json" />
      <link key="canonical" rel="canonical" href={canonicalUrl} />

      <meta key="application-name" name="application-name" content={siteName} />
      <meta key="build-id" name="build-id" content={buildId} />
      <meta key="description" name="description" content={actualDescription} />
      <meta key="keywords" name="keywords" content={actualKeywords} />
      <meta key="theme-color" name="theme-color" content="#00e5e5" />

      {/* This is a blog author atribution for rebel.ar*/}
      <meta key="fediverse:creator" name="fediverse:creator" content="@ezeluduena@rebel.ar" />
      {/* This is a link to my rebel.ar profile for rebel.ar verification. */}
      <link rel="me" href="https://rebel.ar/@ezeluduena" />

      <meta key="og:type" property="og:type" content={publishedTime ? 'article' : 'website'} />
      <meta key="og:site_name" property="og:site_name" content={siteName} />
      <meta key="og:title" property="og:title" content={actualTitle} />
      <meta key="og:description" property="og:description" content={actualDescription} />
      <meta key="og:image" property="og:image" content={actualImageUrl} />
      {imageAlt && <meta key="og:image:alt" property="og:image:alt" content={imageAlt} />}
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      {publishedTime && (
        <meta key="article:published_time" property="article:published_time" content={publishedTime} />
      )}
      {publishedTime && (
        <meta key="article:author" property="article:author" content={author || defaultAuthor} />
      )}

      <meta key="twitter:card" name="twitter:card" content={twitterCard} />
      <meta key="twitter:title" name="twitter:title" content={actualTitle} />
      <meta key="twitter:description" name="twitter:description" content={actualDescription} />
      <meta key="twitter:image" name="twitter:image" content={actualImageUrl} />

      {actualRssUrl && (
        <link
          key="alternate"
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href={actualRssUrl}
        />
      )}

      <script
        key="ld:website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        key="ld:person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      {articleLd && (
        <script
          key="ld:article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
      )}
    </Head>
  );
};

export default Meta;