export type ProjectCategory = 'odoo' | 'data-science' | 'backend' | 'web';

export type Project = {
  name: string;
  categories: ProjectCategory[];
  url: string;
  description?: string;
  homepageUrl?: string;
  technologies?: string[];
};

const projects: Project[] = [
  {
    name: 'name_poniendo_a_trabajar_a_los_numeros',
    categories: ['data-science'],
    url: 'url_poniendo_a_trabajar_a_los_numeros',
    description: 'description_poniendo_a_trabajar_a_los_numeros',
    technologies: ['Python', 'R', 'Pandas', 'Matplotlib', 'R eph']
  },
  {
    name: 'odoo-union',
    categories: ['odoo'],
    url: 'url_odoo_union',
    description: 'description_odoo_union',
    technologies: ['Python', 'XML', 'Odoo', 'PostgreSQL']
  },
  {
    name: 'ezeluduena.dev.ar',
    categories: ['web'],
    url: 'url_ezeluduena_dev_ar',
    description: 'description_ezeluduena',
    technologies: ['TypeScript', 'Next.js', 'TailwindCSS', 'React.js']
  },
  {
    name: 'La Cosa',
    categories: ['backend'],
    url: 'url_la_cosa',
    description: 'description_la_cosa',
    technologies: ['Python', 'FastAPI', 'WebSockets', 'PonyORM']
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
