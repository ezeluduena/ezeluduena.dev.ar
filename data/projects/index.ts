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
    description: 'Una app CLI para encontrar "entidades nombradas" en feeds RSS de páginas de noticias',
    language: 'Java',
    technologies: 'Spark'
  },
  {
    name: 'La Cosa',
    url: 'https://github.com/TukiLaCosa/backend',
    description: 'El backend de una implementación web del juego de mesa "La Cosa"',
    technologies: 'FastAPI - WebSockets - PonyORM'
  },
  {
    name: 'ezeluduena.me',
    url: 'https://github.com/ezeluduena/ezeluduena.me',
    description: 'Mi sitio web personal',
    language: 'TypeScript'
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
