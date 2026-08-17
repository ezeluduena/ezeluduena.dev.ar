export type ProjectCategory = 'odoo' | 'data-science' | 'backend' | 'web';

export type Project = {
  id: string;
  categories: ProjectCategory[];
  technologies: string[];
  homepageUrl?: string;
};

const projects: Project[] = [
  {
    id: 'sol3',
    categories: ['odoo'],
    technologies: ['Docker', 'Python', 'XML', 'PostgreSQL']
  },
  {
    id: 'inflation-adjustment',
    categories: ['odoo'],
    technologies: ['Python', 'XML']
  },
  {
    id: 'odoo-argentina',
    categories: ['odoo'],
    technologies: ['Python', 'ARCA WebServices', 'XML']
  },
  {
    id: 'payment-sipago',
    categories: ['odoo', 'backend'],
    technologies: ['Python', 'Checkout API', 'XML']
  },
  {
    id: 'poniendo_a_trabajar_a_los_numeros',
    categories: ['data-science'],
    technologies: ['Python', 'R', 'Pandas', 'Matplotlib', 'R eph']
  },
  {
    id: 'odoo-union',
    categories: ['odoo'],
    technologies: ['Python', 'XML', 'PostgreSQL']
  },
  {
    id: 'ezeluduena-dev-ar',
    categories: ['web'],
    technologies: ['TypeScript', 'Next.js', 'TailwindCSS', 'React.js']
  },
  {
    id: 'la-cosa',
    categories: ['backend'],
    technologies: ['Python', 'FastAPI', 'WebSockets', 'PonyORM']
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
