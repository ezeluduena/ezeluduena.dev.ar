import c from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { FiUsers, FiMessageCircle, FiVideo, FiCalendar, FiMapPin, FiFileText } from 'react-icons/fi';
import Heading from '~/components/heading';
import Inline from '~/components/inline';
import Link from '~/components/link';
import Meta from '~/components/meta';
import Paragraph from '~/components/paragraph';
import Timeline from '~/components/timeline';
import TimelineItem from '~/components/timelineItem';
import SocialLinks from '~/components/sociallinks';
import { Talk, loadTalks } from '~/data/talks';
import { groupBy } from '~/utils/array';
import { bufferIterable } from '~/utils/async';
import { deleteUndefined } from '~/utils/object';
import useLocale from "~/hooks/useLocale";
import talksTranslations from "~/public/locale/talks";

type TalksPageProps = {
    talks: Talk[];
};

const TalksPage: NextPage<TalksPageProps> = ({ talks }) => {
    const locale = useLocale().locale;
    const t: { [key: string]: string } = talksTranslations[locale];

    const talksByYear = groupBy(talks, (talk) => talk.date ? new Date(talk.date).getFullYear() : new Date().getFullYear()).sort(
        (a, b) => b.key - a.key
    );

    return (
        <>
            <Meta title={t.title} />

            <section>
                <Heading>{t.title}</Heading>
                <Paragraph>
                    {t.description}
                </Paragraph>
            </section>

            <section className={c('mt-8', 'space-y-6')}>
                {talksByYear.map(({ key: year, items }, i) => (
                    <section key={i}>
                        <Heading level={2}>{year}</Heading>

                        <div className={c('ml-4')}>
                            <Timeline>
                                {items.map((talk, i) => (
                                    <TimelineItem key={i}>
                                        {/* Title */}
                                        <div className={c('text-lg')}>
                                            <Link href={t[talk.url] || talk.url || '#'}>{t[talk.name] || talk.name}</Link>
                                        </div>

                                        <div className={c('grow', 'my-1', 'space-y-1', 'text-neutral-600', 'dark:text-neutral-400')}>
                                            {/* Description */}
                                            <div>{talk.description && (t[talk.description] || talk.description)}</div>
                                        </div>

                                        {/* Misc info */}
                                        <div className={c('flex', 'flex-wrap', 'gap-x-3', 'font-light')}>
                                            {talk.date && (
                                                <Inline>
                                                    <FiCalendar strokeWidth={1} />
                                                    <div>
                                                        {locale === 'es'
                                                            ? new Date(talk.date).toLocaleDateString('es-ES', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })
                                                            : new Date(talk.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                    </div>
                                                </Inline>
                                            )}

                                            {talk.event && (
                                                <Inline>
                                                    <FiMapPin strokeWidth={1} />
                                                    <div>
                                                        {talk.event_url ? (
                                                            <Link href={t[talk.event_url] || talk.event_url}>{t[talk.event] || talk.event}</Link>
                                                        ) : (
                                                            t[talk.event] || talk.event
                                                        )}
                                                    </div>
                                                </Inline>
                                            )}

                                            {talk.video_url && (
                                                <Inline>
                                                    <FiVideo strokeWidth={1} />
                                                    <div>
                                                        <Link href={t[talk.video_url] || talk.video_url}>
                                                            {locale === 'es' ? 'Video' : 'Video'}
                                                        </Link>
                                                    </div>
                                                </Inline>
                                            )}

                                            {talk.slides_url && (
                                                <Inline>
                                                    <FiFileText strokeWidth={1} />
                                                    <div>
                                                        <Link href={t[talk.slides_url] || talk.slides_url}>
                                                            {locale === 'es' ? 'Diapositivas' : 'Slides'}
                                                        </Link>
                                                    </div>
                                                </Inline>
                                            )}
                                        </div>

                                        {talk.language && (
                                            <div className={c('flex', 'items-center', 'gap-1', 'text-sm', 'text-neutral-600', 'dark:text-neutral-400')}>
                                                <FiMessageCircle strokeWidth={1} />
                                                <div>
                                                    {t[talk.language] || talk.language}
                                                </div>
                                            </div>
                                        )}

                                        {talk.with && (
                                            <div className={c('flex', 'items-center', 'gap-1', 'text-sm', 'text-neutral-600', 'dark:text-neutral-400')}>
                                                <FiUsers strokeWidth={1} />
                                                <div>
                                                    {locale === 'es' ? 'Con' : 'With'} {t[talk.with] || talk.with}
                                                </div>
                                            </div>
                                        )}
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

export const getStaticProps: GetStaticProps<TalksPageProps> = async () => {
    const talks = await bufferIterable(loadTalks());

    // Remove undefined values because they cannot be serialized
    deleteUndefined(talks);
    talks.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
    return {
        props: {
            talks
        }
    };
};

export default TalksPage;
