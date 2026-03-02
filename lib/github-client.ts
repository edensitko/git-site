import { GitHubUser, GitHubRepo, GitHubOrganization, DetectedSkills } from "./types";

const GITHUB_API = "https://api.github.com";
const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };

export async function fetchGitHubUserClient(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, { headers });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchGitHubReposClient(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`, { headers });
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((repo) => !repo.fork);
  } catch {
    return [];
  }
}

export async function fetchGitHubOrgsClient(username: string): Promise<GitHubOrganization[]> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}/orgs`, { headers });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export function detectSkillsClient(repos: GitHubRepo[]): DetectedSkills {
  const languages = new Set<string>();
  const tools = new Set<string>();
  const frameworks = new Set<string>();

  for (const repo of repos) {
    if (repo.language) languages.add(repo.language);
    const topics = repo.topics || [];
    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();

    if (topics.includes("docker") || name.includes("docker") || desc.includes("docker")) tools.add("Docker");
    if (topics.includes("kubernetes") || topics.includes("k8s") || name.includes("kubernetes") || desc.includes("kubernetes")) tools.add("Kubernetes");
    if (topics.includes("terraform") || name.includes("terraform") || desc.includes("terraform")) tools.add("Terraform");
    if (topics.includes("aws")) tools.add("AWS");
    if (topics.includes("react")) frameworks.add("React");
    if (topics.includes("nextjs") || topics.includes("next")) frameworks.add("Next.js");
    if (topics.includes("vue") || topics.includes("vuejs")) frameworks.add("Vue.js");
    if (topics.includes("angular")) frameworks.add("Angular");
    if (topics.includes("flutter") || name.includes("flutter") || desc.includes("flutter")) frameworks.add("Flutter");
    if (topics.includes("django")) frameworks.add("Django");
    if (topics.includes("flask")) frameworks.add("Flask");
    if (topics.includes("fastapi")) frameworks.add("FastAPI");
  }

  return {
    languages: Array.from(languages).slice(0, 10),
    tools: Array.from(tools),
    frameworks: Array.from(frameworks),
  };
}
