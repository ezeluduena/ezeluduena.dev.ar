export type ProjectCategory = 'odoo' | 'data-science' | 'backend' | 'web';

export type Project = {
  id: string;
  categories: ProjectCategory[];
  technologies: string[];
  homepageUrl?: string;
};

const projects: Project[] = [
  {
    id: 'poniendo_a_trabajar_a_los_numeros',
    categories: ['data-science'],
    technologies: ['Python', 'R', 'Pandas', 'Matplotlib', 'R eph']
  },
  {
    id: 'odoo-union',
    categories: ['odoo'],
    technologies: ['Python', 'XML', 'Odoo', 'PostgreSQL']
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
