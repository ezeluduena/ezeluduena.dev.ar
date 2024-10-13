
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
    name: 'ezeluduena.dev.ar',
    url: 'https://github.com/ezeluduena/ezeluduena.dev.ar',
    description: 'description_ezeluduena',
    language: 'TypeScript',
    technologies: 'Next.js - TailwindCSS - React.js'
  },
  {
    name: 'La Cosa',
    url: '/blog/es/la_cosa',
    description: 'description_la_cosa',
    technologies: 'FastAPI - WebSockets - PonyORM'
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
