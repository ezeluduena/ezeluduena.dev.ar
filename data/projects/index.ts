
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
    name: 'name_poniendo_a_trabajar_a_los_numeros',
    url: 'url_poniendo_a_trabajar_a_los_numeros',
    description: 'description_poniendo_a_trabajar_a_los_numeros',
    language: 'Python - R',
    technologies: 'Pandas - Matplotlib - R eph'
  },
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
