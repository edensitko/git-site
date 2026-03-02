import { GitHubRepo, DetectedSkills, DeveloperSummary } from "./types";
import { fetchRepoContents } from "./github";

// Constants
const MAX_LANGUAGES_TO_DISPLAY = 10;
const MAX_SKILLS_TO_DISPLAY = 5;
const TOP_LANGUAGES_COUNT = 3;
const MIN_STARS_FOR_MENTION = 100;

/**
 * Detect skills from user's repositories
 * @param username - GitHub username
 * @param repos - Array of user's repositories
 * @returns Detected skills categorized by type
 */
export async function detectSkillsFromRepos(
  username: string,
  repos: GitHubRepo[]
): Promise<DetectedSkills> {
  const languages = new Set<string>();
  const tools = new Set<string>();
  const frameworks = new Set<string>();

  for (const repo of repos) {
    if (repo.language) {
      languages.add(repo.language);
    }

    const repoNameLower = repo.name.toLowerCase();
    const descLower = (repo.description || "").toLowerCase();
    const topics = repo.topics || [];

    const checkPatterns = async () => {
      try {
        const contents = await fetchRepoContents(username, repo.name);
        const fileNames = contents.map((file) => file.name.toLowerCase());

        if (fileNames.includes("dockerfile") || fileNames.includes(".dockerignore")) {
          tools.add("Docker");
        }
        if (fileNames.some((f) => f.includes("terraform"))) {
          tools.add("Terraform");
        }
        if (
          fileNames.some((f) => f.includes("k8s") || f.includes("kubernetes")) ||
          topics.includes("kubernetes")
        ) {
          tools.add("Kubernetes");
        }
        if (fileNames.includes("package.json")) {
          frameworks.add("Node.js");
        }
        if (fileNames.includes("requirements.txt") || fileNames.includes("pyproject.toml")) {
          frameworks.add("Python");
        }
      } catch (error) {
        // Silent fail for rate limits
      }
    };

    if (topics.includes("docker")) tools.add("Docker");
    if (topics.includes("kubernetes") || topics.includes("k8s")) tools.add("Kubernetes");
    if (topics.includes("terraform")) tools.add("Terraform");
    if (topics.includes("aws")) tools.add("AWS");
    if (topics.includes("react")) frameworks.add("React");
    if (topics.includes("nextjs") || topics.includes("next")) frameworks.add("Next.js");
    if (topics.includes("vue") || topics.includes("vuejs")) frameworks.add("Vue.js");
    if (topics.includes("angular")) frameworks.add("Angular");
    if (topics.includes("flutter")) frameworks.add("Flutter");
    if (topics.includes("django")) frameworks.add("Django");
    if (topics.includes("flask")) frameworks.add("Flask");
    if (topics.includes("fastapi")) frameworks.add("FastAPI");

    if (repoNameLower.includes("docker") || descLower.includes("docker")) {
      tools.add("Docker");
    }
    if (repoNameLower.includes("kubernetes") || descLower.includes("kubernetes")) {
      tools.add("Kubernetes");
    }
    if (repoNameLower.includes("terraform") || descLower.includes("terraform")) {
      tools.add("Terraform");
    }
    if (repoNameLower.includes("flutter") || descLower.includes("flutter")) {
      frameworks.add("Flutter");
    }

    // Check repo file contents for tool/framework detection
    await checkPatterns();
  }

  return {
    languages: Array.from(languages).slice(0, MAX_LANGUAGES_TO_DISPLAY),
    tools: Array.from(tools),
    frameworks: Array.from(frameworks),
  };
}

/**
 * Generate a developer summary based on repositories and skills
 * @param repos - Array of user's repositories
 * @param skills - Detected skills
 * @returns Developer summary with primary languages and description
 */
export function generateDeveloperSummary(
  repos: GitHubRepo[],
  skills: DetectedSkills
): DeveloperSummary {
  const languageCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const primaryLanguages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, TOP_LANGUAGES_COUNT)
    .map(([lang]) => lang);

  const allSkills = [
    ...skills.languages.slice(0, TOP_LANGUAGES_COUNT),
    ...skills.frameworks,
    ...skills.tools,
  ];
  const topSkills = allSkills.slice(0, MAX_SKILLS_TO_DISPLAY);

  let summary = "This developer";

  if (primaryLanguages.length > 0) {
    summary += ` mainly works with ${primaryLanguages.join(", ")}`;
  }

  if (skills.frameworks.length > 0 || skills.tools.length > 0) {
    const techStack = [...skills.frameworks, ...skills.tools].slice(0, TOP_LANGUAGES_COUNT);
    if (primaryLanguages.length > 0) {
      summary += `, and uses ${techStack.join(", ")}`;
    } else {
      summary += ` works with ${techStack.join(", ")}`;
    }
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  if (totalStars > MIN_STARS_FOR_MENTION) {
    summary += `. Their projects have earned ${totalStars}+ stars`;
  }

  summary += ".";

  return {
    primaryLanguages,
    topSkills,
    summary,
  };
}

/**
 * Calculate repository insights including most starred/forked repos
 * @param repos - Array of user's repositories
 * @returns Repository insights object
 */
export function calculateRepoInsights(repos: GitHubRepo[]) {
  if (repos.length === 0) {
    return {
      mostStarred: null,
      mostForked: null,
      recentlyUpdated: [],
      totalStars: 0,
      totalForks: 0,
      avgStarsPerRepo: 0,
    };
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  const mostStarred = repos.reduce((max, repo) => 
    repo.stargazers_count > max.stargazers_count ? repo : max
  );
  
  const mostForked = repos.reduce((max, repo) => 
    repo.forks_count > max.forks_count ? repo : max
  );
  
  const recentlyUpdated = [...repos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  return {
    mostStarred,
    mostForked,
    recentlyUpdated,
    totalStars,
    totalForks,
    avgStarsPerRepo: Math.round(totalStars / repos.length),
  };
}

/**
 * Calculate contribution statistics from GitHub events
 * @param events - Array of GitHub events
 * @returns Contribution statistics object
 */
export function calculateContributionStats(events: any[]) {
  const stats = {
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    totalReviews: 0,
  };

  events.forEach((event) => {
    switch (event.type) {
      case "PushEvent":
        stats.totalCommits += event.payload.commits?.length || 0;
        break;
      case "PullRequestEvent":
        stats.totalPRs += 1;
        break;
      case "IssuesEvent":
        stats.totalIssues += 1;
        break;
      case "PullRequestReviewEvent":
        stats.totalReviews += 1;
        break;
    }
  });

  return stats;
}

