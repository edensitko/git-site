import { GitHubUser, GitHubRepo, GitHubOrganization } from "./types";

const GITHUB_API = "https://api.github.com";
const CACHE_REVALIDATE_TIME = 3600; // 1 hour in seconds

/**
 * Get headers for GitHub API requests with optional authentication
 * @returns Headers object with Accept and optional Authorization
 */
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  const token = process.env.APP_TOKEN;

  console.log("[github] APP_TOKEN loaded:", !!token, "length:", token?.length, "prefix:", token?.slice(0, 6));

  if (token) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  return headers;
};

/**
 * Fetch GitHub user profile data
 * @param username - GitHub username
 * @returns User data or null if not found
 */
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}`, {
      next: { revalidate: CACHE_REVALIDATE_TIME },
      headers: getHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching GitHub user ${username}:`, error);
    return null;
  }
}

/**
 * Fetch user's GitHub repositories (excluding forks)
 * @param username - GitHub username
 * @returns Array of repositories
 */
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
      {
        next: { revalidate: CACHE_REVALIDATE_TIME },
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    return repos.filter((repo) => !repo.fork);
  } catch (error) {
    console.error(`Error fetching repos for ${username}:`, error);
    return [];
  }
}

/**
 * Fetch repository contents
 * @param username - GitHub username
 * @param repo - Repository name
 * @param path - Path within repository (default: root)
 * @returns Array of file/directory objects
 */
interface RepoContentItem {
  name: string;
  path: string;
  type: "file" | "dir" | "symlink" | "submodule";
  size: number;
  sha: string;
  url: string;
  html_url: string;
  download_url: string | null;
}

export async function fetchRepoContents(
  username: string,
  repo: string,
  path: string = ""
): Promise<RepoContentItem[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${username}/${repo}/contents/${path}`,
      {
        next: { revalidate: CACHE_REVALIDATE_TIME },
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    return [];
  }
}

/**
 * Fetch user's GitHub organizations
 * @param username - GitHub username
 * @returns Array of organizations
 */
export async function fetchGitHubOrgs(username: string): Promise<GitHubOrganization[]> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${username}/orgs`, {
      next: { revalidate: CACHE_REVALIDATE_TIME },
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching orgs for ${username}:`, error);
    return [];
  }
}

/**
 * Fetch language statistics for a repository
 * @param username - GitHub username
 * @param repo - Repository name
 * @returns Object mapping language names to byte counts
 */
export async function fetchRepoLanguages(
  username: string,
  repo: string
): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${username}/${repo}/languages`,
      {
        next: { revalidate: CACHE_REVALIDATE_TIME },
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    return {};
  }
}
