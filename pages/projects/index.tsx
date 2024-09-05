import c from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { FiTool, FiCode, FiExternalLink } from 'react-icons/fi';
import Heading from '~/components/heading';
import Inline from '~/components/inline';
import Link from '~/components/link';
import Meta from '~/components/meta';
import Paragraph from '~/components/paragraph';
import SocialLinks from '~/components/sociallinks';
import { Project, loadProjects } from '~/data/projects';
import { bufferIterable } from '~/utils/async';
import { deleteUndefined } from '~/utils/object';
import useLocale from "~/hooks/useLocale";
import projectsTranslations from "~/public/locale/projects";


type ProjectsPageProps = {
  projects: Project[];
};


const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  const t: { [key: string]: string } = projectsTranslations[useLocale().locale];

  return (
    <>
      <Meta title={t.title} />

      <section>
        <Heading>{t.title}</Heading>
        <Paragraph>
          {t.description}
        </Paragraph>
      </section>

      <section

        className={c('grid', 'sm:grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'mt-8', 'gap-3')}
      >
        {projects.map((project, i) => (
          <section
            key={i}
            className={c(
              'flex',
              'flex-col',
              'p-4',
              'border',
              'border-cyan-500',
              'dark:border-cyan-700',
              'rounded'
            )}
          >
            {/* Name */}
            <div className={c('text-lg', 'text-ellipsis', 'overflow-hidden')} title={project.name}>
              <Link href={project.url}>{project.name}</Link>
            </div>

            <div className={c('grow', 'my-1', 'space-y-1')}>
              {/* Description */}
              <div>{project.description && t[project.description]}</div>
            </div>

            <div>
              {/* Homepage */}
              {project.homepageUrl && (
                <div className={c('overflow-hidden')}>
                  <Inline>
                    <FiExternalLink strokeWidth={1} />
                    <div>
                      <Link href={project.homepageUrl}>{project.homepageUrl}</Link>
                    </div>
                  </Inline>
                </div>
              )}
            </div>

            {/* Misc info */}
            <div className={c('flex', 'flex-wrap', 'mt-1', 'gap-x-3')}>

              {project.language && (
                <Inline>
                  <FiCode className={c('font-bold', 'border-cyan-900')} strokeWidth={1.6} />
                  <div className={c('font-light')}>{project.language}</div>
                </Inline>
              )}
              {project.technologies && (
                <Inline>
                  <FiTool className={c('font-bold', 'fill-yellow-400', 'dark:text-yellow-400')}
                    strokeWidth={1} />
                  <div className={c('font-light')}>{project.technologies}</div>
                </Inline>
              )}

            </div>
          </section>
        ))}
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
