export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  company: string | null;
  created_at: string;
  public_gists: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
  size: number;
  open_issues_count: number;
  watchers_count: number;
  license: { name: string } | null;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
}

export interface DetectedSkills {
  languages: string[];
  tools: string[];
  frameworks: string[];
}

export interface DeveloperSummary {
  primaryLanguages: string[];
  topSkills: string[];
  summary: string;
}

export interface GitHubOrganization {
  login: string;
  avatar_url: string;
  description: string | null;
}

export interface LanguageStats {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ContributionStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReviews: number;
}

export interface RepoInsights {
  mostStarred: GitHubRepo | null;
  mostForked: GitHubRepo | null;
  recentlyUpdated: GitHubRepo[];
  totalStars: number;
  totalForks: number;
  avgStarsPerRepo: number;
}
