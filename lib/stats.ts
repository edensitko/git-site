import { GitHubRepo, LanguageStats } from "./types";

// Constants
const DEFAULT_LANGUAGE_COLOR = "#8b949e";
const MAX_LANGUAGE_STATS = 8;

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Jupyter: "#DA5B0B",
};

/**
 * Calculate language statistics from repositories
 * @param repos - Array of user's repositories
 * @returns Array of language statistics with percentages and colors
 */
export function calculateLanguageStats(repos: GitHubRepo[]): LanguageStats[] {
  const languageCounts: Record<string, number> = {};
  let total = 0;

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      total++;
    }
  });

  if (total === 0) {
    return [];
  }

  const stats = Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
      color: LANGUAGE_COLORS[language] || DEFAULT_LANGUAGE_COLOR,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_LANGUAGE_STATS);

  return stats;
}

/**
 * Calculate account age from creation date
 * @param createdAt - ISO date string of account creation
 * @returns Human-readable account age
 */
export function calculateAccountAge(createdAt: string): string {
  const created = new Date(createdAt);
  const now = new Date();
  const years = now.getFullYear() - created.getFullYear();
  const months = now.getMonth() - created.getMonth();

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  }
  return "New";
}

/**
 * Get the most starred repository
 * @param repos - Array of repositories
 * @returns Repository with most stars
 */
export function getMostStarredRepo(repos: GitHubRepo[]) {
  if (repos.length === 0) {
    return null;
  }
  return repos.reduce((max, repo) =>
    repo.stargazers_count > max.stargazers_count ? repo : max
  , repos[0]);
}

/**
 * Get the most forked repository
 * @param repos - Array of repositories
 * @returns Repository with most forks
 */
export function getMostForkedRepo(repos: GitHubRepo[]) {
  if (repos.length === 0) {
    return null;
  }
  return repos.reduce((max, repo) =>
    repo.forks_count > max.forks_count ? repo : max
  , repos[0]);
}

/**
 * Get recently updated repositories
 * @param repos - Array of repositories
 * @param limit - Maximum number of repos to return
 * @returns Array of recently updated repositories
 */
export function getRecentlyUpdatedRepos(repos: GitHubRepo[], limit = 6) {
  return [...repos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit);
}

/**
 * Calculate total statistics across all repositories
 * @param repos - Array of repositories
 * @returns Object with total statistics
 */
export function getTotalStats(repos: GitHubRepo[]) {
  return {
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
    totalSize: repos.reduce((sum, repo) => sum + repo.size, 0),
    totalIssues: repos.reduce((sum, repo) => sum + repo.open_issues_count, 0),
    reposWithProjects: repos.filter((repo) => repo.has_projects).length,
  };
}
