
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
    name: 'odoo-union',
    url: 'url_odoo_union',
    description: 'description_odoo_union',
    language: 'Python - XML',
    technologies: 'Odoo - PostgreSQL'
  },
  {
    name: 'ezeluduena.dev.ar',
    url: 'url_ezeluduena_dev_ar',
    description: 'description_ezeluduena',
    language: 'TypeScript',
    technologies: 'Next.js - TailwindCSS - React.js'
  },
  {
    name: 'La Cosa',
    url: 'url_la_cosa',
    description: 'description_la_cosa',
    technologies: 'FastAPI - WebSockets - PonyORM'
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
