export type Project = {
  name: string;
  url: string;
  archived: boolean;
  description?: string;
  homepageUrl?: string;
  stars: number;
  language?: string;
};

const projects: Project[] = [
  {
    name: 'Contextual',
    url: 'https://github.com/Tyrrrz/Contextual',
    archived: true,
    description: 'Implicit parameters via contexts',
    stars: 37,
    language: 'C#'
  }
];

export const loadProjects = async function* () {
  for (const project of projects) {
    yield project;
  }
};
