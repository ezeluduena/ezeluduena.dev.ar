import useLocale from "~/hooks/useLocale";
import projectsTranslations from "~/public/locale/projects";

export type Project = {
  name: string;
  url: string;
  description?: string;
  homepageUrl?: string;
  language?: string;
  technologies?: string;
};


const projects: Project[] = [
  {
    name: 'Feeds-Analyzer',
    url: 'https://github.com/ezeluduena/feeds-analyzer',
    language: 'Java',
    description: 'description1',
    technologies: 'Spark'
  },
  {
    name: 'La Cosa',
    url: '/blog/la-cosa',
    description: 'description2',
    technologies: 'FastAPI - WebSockets - PonyORM'
  },
  {
    name: 'ezeluduena.dev.ar',
    url: 'https://github.com/ezeluduena/ezeluduena.dev.ar',
    description: 'description3',
    language: 'TypeScript',
    technologies: 'Next.js - TailwindCSS - React.js'
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
