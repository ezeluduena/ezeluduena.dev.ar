import c from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import Heading from '~/components/heading';
import Inline from '~/components/inline';
import Link from '~/components/link';
import Meta from '~/components/meta';
import Paragraph from '~/components/paragraph';
import SocialLinks from '~/components/sociallinks';
import projectsTranslations from '~/data/locale/projects';
import { Project, ProjectCategory, loadProjects } from '~/data/projects';
import useLocale from '~/hooks/useLocale';
import { bufferIterable } from '~/utils/async';
import { deleteUndefined } from '~/utils/object';

type ProjectsPageProps = {
  projects: Project[];
};

type ProjectTranslation = {
  name: string;
  description: string;
  url: string;
};

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  const locale = useLocale().locale;
  const t = projectsTranslations[locale];
  const categories = Object.keys(t.categories).filter((c) => c !== 'all') as ProjectCategory[];
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.categories.includes(activeCategory));

  const tr = (id: string): ProjectTranslation =>
    (t.projects as Record<string, ProjectTranslation>)[id] ?? {
      name: id,
      description: '',
      url: '#'
    };

  return (
    <>
      <Meta title={t.title} />

      <section>
        <Heading>{t.title}</Heading>
        <Paragraph>{t.description}</Paragraph>
      </section>

      {/* Category filter tabs */}
      <div className={c('flex', 'flex-wrap', 'gap-2', 'mt-6', 'mb-4')}>
        {(['all', ...categories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={c(
              'px-3',
              'py-1',
              'rounded',
              'text-sm',
              'border',
              'transition-colors',
              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-cyan-500',
              'focus-visible:ring-offset-2',
              {
                'border-cyan-500': activeCategory === cat,
                'bg-cyan-500': activeCategory === cat,
                'text-white': activeCategory === cat,
                'border-neutral-200': activeCategory !== cat,
                'dark:border-neutral-700': activeCategory !== cat,
                'hover:border-cyan-400': activeCategory !== cat
              }
            )}
          >
            {t.categories[cat]}
          </button>
        ))}
      </div>

      <section
        className={c(
          'grid',
          'sm:grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-3',
          'gap-3',
          'auto-rows-fr',
          'items-stretch'
        )}
      >
        {filteredProjects.map((project) => {
          const pt = tr(project.id);
          return (
            <section
              key={project.id}
              className={c(
                'group',
                'relative',
                'h-full',
                'p-4',
                'border',
                'border-cyan-500',
                'dark:border-cyan-700',
                'rounded',
                'transition-colors',
                'hover:border-cyan-400',
                'hover:bg-cyan-50',
                'dark:hover:bg-cyan-900/20'
              )}
            >
              <Link
                href={pt.url}
                variant="hidden"
                className={c('absolute', 'inset-0', 'z-10', 'block')}
              >
                <span className={c('sr-only')}>{pt.name}</span>
              </Link>

              <div
                className={c(
                  'relative',
                  'z-0',
                  'flex',
                  'flex-col',
                  'h-full',
                  'pointer-events-none'
                )}
              >
                {/* Name */}
                <div
                  className={c(
                    'text-lg',
                    'text-ellipsis',
                    'overflow-hidden',
                    'text-blue-500',
                    'dark:text-blue-300',
                    'group-hover:underline'
                  )}
                  title={pt.name}
                >
                  {pt.name}
                </div>

                <div className={c('grow', 'my-1', 'space-y-1')}>
                  {/* Description */}
                  <div>{pt.description}</div>
                </div>

                {/* Tech chips */}
                {project.technologies.length > 0 && (
                  <div className={c('flex', 'flex-wrap', 'gap-1', 'mt-2')}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={c(
                          'px-2',
                          'py-0.5',
                          'rounded',
                          'text-xs',
                          'bg-cyan-100',
                          'dark:bg-cyan-900',
                          'text-neutral-700',
                          'dark:text-neutral-300'
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Homepage */}
              {project.homepageUrl && (
                <div className={c('overflow-hidden', 'pointer-events-auto', 'relative', 'z-20')}>
                  <Inline>
                    <FiExternalLink strokeWidth={1} />
                    <div>
                      <Link href={project.homepageUrl}>{project.homepageUrl}</Link>
                    </div>
                  </Inline>
                </div>
              )}
            </section>
          );
        })}
      </section>

      <SocialLinks />
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projects = await bufferIterable(loadProjects());

  // Remove undefined values because they cannot be serialized
  deleteUndefined(projects);

  return {
    props: {
      projects
    }
  };
};

export default ProjectsPage;
