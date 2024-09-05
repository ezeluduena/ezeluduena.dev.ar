import Giscus from '@giscus/react';
import c from 'classnames';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { FC } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import Heading from '~/components/heading';
import Image from '~/components/image';
import Inline from '~/components/inline';
import Link from '~/components/link';
import Markdown from '~/components/markdown';
import Meta from '~/components/meta';
import { BlogPost, loadBlogPost, loadBlogPostRefs, publishBlogPostAssets } from '~/data/blog/es';
import useTheme from '~/hooks/useTheme';
import { deleteUndefined } from '~/utils/object';
import { isAbsoluteUrl } from '~/utils/url';

type BlogPostPageProps = {
  post: BlogPost;
};

type BlogPostPageParams = {
  id: string;
};

const CoverSection: FC<BlogPostPageProps> = ({ post }) => {
  if (!post.coverUrl) {
    return null;
  }

  return (
    <section className={c('p-4', 'rounded')}>
      <div className={c('w-fit', 'mx-auto')}>
        <Image src={post.coverUrl} width={800} height={450} alt="Cover image" priority />
      </div>
    </section>
  );
};

const ArticleSection: FC<BlogPostPageProps> = ({ post }) => {
  return (
    <section>
      <article>
        <Markdown
          source={post.source}
          // Transform local-relative URLs to site-relative URLs
          transformUrl={(url: string) => {
            if (isAbsoluteUrl(url) || url.startsWith('/')) {
              return url;
            }

            return `/blog/es/${post.id}/${url}`;
          }}
        />
      </article>
    </section>
  );
};

const CommentSection: FC<BlogPostPageProps> = ({ post }) => {
  const { userPreferredTheme } = useTheme();

  return (
    <section>
      <Giscus
        repo="ezeluduena/ezeluduena.dev.ar"
        repoId="R_kgDOMZ12Hw"
        category="Blog"
        categoryId="DIC_kwDOMZ12H84ChJN4"
        mapping="specific"
        strict="1"
        term={post.title}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={
          userPreferredTheme === 'dark'
            ? 'dark'
            : userPreferredTheme === 'light'
              ? 'light'
              : 'preferred_color_scheme'
        }
        lang="es"
        loading="lazy"
      />
    </section>
  );
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  return (
    <>
      <Meta
        title={post.title}
        description={post.excerpt}
        imageLayout={post.coverUrl ? 'fill' : 'aside'}
        imageUrl={post.coverUrl}
        rssUrl="/blog/rss.xml"
      />

      <div className={c('space-y-4')}>
        <section>
          {/* Title */}
          <Heading>{post.title}</Heading>

          {/* Misc info */}
          <div className={c('flex', 'flex-wrap', '-mt-2', 'gap-x-3', 'font-light')}>
            <Inline>
              <FiCalendar strokeWidth={1} />
              <div>
                {new Date(post.date).toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </Inline>

            <Inline>
              <FiClock strokeWidth={1} />
              <div>{Math.round(post.readingTimeMins)} min de lectura</div>
            </Inline>
          </div>
        </section>

        {/* Detailed info */}
        <CoverSection post={post} />
        <ArticleSection post={post} />
        <CommentSection post={post} />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<BlogPostPageParams> = async () => {
  const ids: string[] = [];
  for await (const post of loadBlogPostRefs()) {
    ids.push(post.id);
  }

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, BlogPostPageParams> = async ({
  params
}) => {
  const { id } = params || {};
  if (!id) {
    throw new Error('Missing blog post ID');
  }

  await publishBlogPostAssets(id);
  const post = await loadBlogPost(id);

  // Remove undefined values because they cannot be serialized
  deleteUndefined(post);

  return {
    props: {
      post
    }
  };
};

export default BlogPostPage;
