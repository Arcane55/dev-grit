import { Octokit } from '@octokit/rest';

/**
 * Fetches the 10 most recent commits from a GitHub repository
 * @param {string} owner - The repository owner
 * @param {string} repo - The repository name
 * @returns {Promise<Array>} Array of commits with date and message
 */
export async function getRecentCommits(owner, repo) {
  const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_PAT,
  });

  try {
    const response = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: 10,
    });

    return response.data.map((commit) => ({
      hash: commit.sha.slice(0, 7),
      date: commit.commit.author.date,
      message: commit.commit.message,
      author: commit.commit.author.name,
    }));
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
}
