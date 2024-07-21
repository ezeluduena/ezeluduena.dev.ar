import { Octokit } from '@octokit/rest';
import { getGitHubToken } from '~/utils/env';

const createClient = () => {
  return new Octokit({
    auth: getGitHubToken()
  });
};

export const getGitHubRepos = async () => {
  const github = createClient();

  return await github.paginate(github.repos.listForUser, {
    username: 'ezeluduena',
    type: 'owner',
    per_page: 100,
    sort: 'pushed'
  });
};
