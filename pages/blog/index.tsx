import c from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { FiCalendar, FiClock } from 'react-icons/fi';
import Heading from '~/components/heading';
import Inline from '~/components/inline';
import Link from '~/components/link';
import Meta from '~/components/meta';
import Paragraph from '~/components/paragraph';
import Timeline from '~/components/timeline';
import TimelineItem from '~/components/timelineItem';
import SocialLinks from '~/components/sociallinks';
import { BlogPostRef, loadBlogPostRefs, publishBlogFeed } from '~/data/blog/es';
import { groupBy } from '~/utils/array';
import { bufferIterable } from '~/utils/async';
import { deleteUndefined } from '~/utils/object';
import blogTranslations from '~/public/locale/blog';
import useLocale from '~/hooks/useLocale';

type BlogPageProps = {
  posts: BlogPostRef[];
};

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
  const postsByYear = groupBy(posts, (post) => new Date(post.date).getFullYear()).sort(
    (a, b) => b.key - a.key
  );

  const locale = useLocale().locale;
  const t = blogTranslations[locale];

  return (
    <>
      <Meta title="Blog" rssUrl="/blog/rss.xml" />

      <section>
        <Heading>Blog</Heading>

        <Paragraph>
          {t.description0}
          <br />
          {t.description1}
          <Link href="/blog/rss.xml" external>
            {t.description2}
          </Link>
          {t.description3}
        </Paragraph>
      </section>

      <section className={c('mt-8', 'space-y-6')}>
        {postsByYear.map(({ key: year, items }, i) => (
          <section key={i}>
            <Heading level={2}>{year}</Heading>

            <div className={c('ml-4')}>
              <Timeline>
                {items.map((post, i) => (
                  <TimelineItem key={i}>
                    {/* Title */}
                    <div className={c('text-lg')}>
                      <Link href={`/blog/${locale}/${post.id}`}>{post.title}</Link>
                    </div>

                    {/* Misc info */}
                    <div className={c('flex', 'flex-wrap', 'gap-x-3', 'font-light')}>
                      <Inline>
                        <FiCalendar strokeWidth={1} />
                        <div>
                          {locale === 'es'
                            ? new Date(post.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                            : new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                        </div>
                      </Inline>

                      <Inline>
                        <FiClock strokeWidth={1} />
                        <div>{Math.round(post.readingTimeMins)} {t.time} </div>
                      </Inline>
                    </div>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </section>
        ))}
      </section>
      <SocialLinks />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  await publishBlogFeed();

  const posts = await bufferIterable(loadBlogPostRefs());

  // Remove undefined values because they cannot be serialized
  deleteUndefined(posts);

  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return {
    props: {
      posts
    }
  };
};

export default BlogPage;
