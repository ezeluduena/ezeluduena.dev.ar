import c from 'classnames';
import { GetStaticProps, NextPage } from 'next';
import { FiTerminal, FiCode, FiExternalLink } from 'react-icons/fi';
import Heading from '~/components/heading';
import Inline from '~/components/inline';
import Link from '~/components/link';
import Meta from '~/components/meta';
import Paragraph from '~/components/paragraph';
import { Project, loadProjects } from '~/data/projects';
import { bufferIterable } from '~/utils/async';
import { deleteUndefined } from '~/utils/object';

type ProjectsPageProps = {
  projects: Project[];
};

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  return (
    <>
      <Meta title="Projects" />

      <section>
        <Heading>Proyectos</Heading>

        <Paragraph>
          Estos son proyectos en los que estuve trabajando. Algunos de ellos son personales mientras que
          otros son producto de mis estudios.

        </Paragraph>
      </section>

      <section
        className={c('grid', 'sm:grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'mt-15', 'gap-3')}
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
            <div>
              {/* Description */}
              <div>{project.description}</div>

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
            <div className={c('flex', 'flex-wrap', 'mt-1', 'gap-x-3', 'font-light')}>

              {project.language && (
                <Inline>
                  <FiCode strokeWidth={1} />
                  <div>{project.language}</div>
                </Inline>
              )}

              {project.technologies && (
                <Inline>
                  <FiTerminal strokeWidth={1} />
                  <div>{project.technologies}</div>
                </Inline>
              )}

            </div>
          </section>
        ))}
      </section>
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
