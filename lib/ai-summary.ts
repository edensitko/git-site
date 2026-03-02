import { GitHubUser, GitHubRepo, DetectedSkills } from "./types";

export interface AISummary {
  tagline: string;
  summary: string;
  strengths: string[];
  careerLevel: string;
}

export async function generateAISummary(
  user: GitHubUser,
  repos: GitHubRepo[],
  skills: DetectedSkills
): Promise<AISummary> {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const primaryLang = skills.languages[0] || "Full Stack";
  // Use user.public_repos (real GitHub number) — repos[] is filtered (no forks) and capped at 100
  const repoCount = user.public_repos;

  // Analyze repository types
  const hasOpenSource = repos.some(r => r.stargazers_count > 50);
  const hasRecentActivity = repos.some(r => {
    const updated = new Date(r.updated_at);
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - 3);
    return updated > monthsAgo;
  });

  // Generate dynamic tagline based on profile
  let tagline = "";
  if (totalStars > 1000) {
    tagline = `Open source contributor with ${totalStars}+ stars across projects`;
  } else if (skills.frameworks.length > 3) {
    tagline = `Full-stack developer mastering ${skills.frameworks.slice(0, 2).join(" & ")}`;
  } else if (hasOpenSource) {
    tagline = `${primaryLang} developer building impactful open source projects`;
  } else if (repoCount > 30) {
    tagline = `Prolific developer with ${repoCount}+ projects in ${primaryLang}`;
  } else {
    tagline = `${primaryLang} developer passionate about ${skills.frameworks[0] || "modern development"}`;
  }

  // Generate detailed summary
  let summary = `${user.name || user.login} is a `;
  
  if (skills.languages.length > 3) {
    summary += `polyglot developer with expertise in ${skills.languages.slice(0, 3).join(", ")}, and ${skills.languages.length - 3} more languages. `;
  } else if (skills.languages.length > 1) {
    summary += `developer specializing in ${skills.languages.slice(0, 2).join(" and ")}. `;
  } else {
    summary += `${primaryLang} developer. `;
  }

  if (totalStars > 100) {
    summary += `Their ${repoCount} public repositories have earned ${totalStars} stars and ${totalForks} forks, demonstrating strong community impact. `;
  } else if (repoCount > 20) {
    summary += `With ${repoCount} public repositories, they showcase consistent productivity and diverse technical skills. `;
  } else {
    summary += `Their portfolio of ${repoCount} repositories showcases practical experience and technical growth. `;
  }

  if (skills.frameworks.length > 0) {
    summary += `Proficient in ${skills.frameworks.slice(0, 3).join(", ")}${skills.frameworks.length > 3 ? `, and ${skills.frameworks.length - 3} more frameworks` : ""}.`;
  }

  // --- Career level: point-based scoring across multiple signals ---
  let score = 0;

  // 1. Account age on GitHub
  const accountAgeYears = (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365);
  if (accountAgeYears >= 6) score += 4;
  else if (accountAgeYears >= 4) score += 3;
  else if (accountAgeYears >= 2) score += 2;
  else if (accountAgeYears >= 1) score += 1;

  // 2. Public repos (real count from GitHub)
  if (repoCount >= 50) score += 4;
  else if (repoCount >= 25) score += 3;
  else if (repoCount >= 10) score += 2;
  else if (repoCount >= 3) score += 1;

  // 3. Total stars — community recognition
  if (totalStars >= 500) score += 4;
  else if (totalStars >= 100) score += 3;
  else if (totalStars >= 20) score += 2;
  else if (totalStars >= 5) score += 1;

  // 4. Followers
  if (user.followers >= 200) score += 3;
  else if (user.followers >= 50) score += 2;
  else if (user.followers >= 10) score += 1;

  // 5. Language diversity
  const langCount = skills.languages.length;
  if (langCount >= 6) score += 3;
  else if (langCount >= 4) score += 2;
  else if (langCount >= 2) score += 1;

  // 6. Framework + tool breadth
  const techCount = skills.frameworks.length + skills.tools.length;
  if (techCount >= 8) score += 2;
  else if (techCount >= 4) score += 1;

  // 7. Impactful open-source presence
  if (totalStars >= 100 && hasOpenSource) score += 2;
  else if (hasOpenSource) score += 1;

  let careerLevel = "Developer";
  if (score >= 16) careerLevel = "Senior Developer";
  else if (score >= 9) careerLevel = "Mid-Level Developer";
  else if (score >= 4) careerLevel = "Junior Developer";

  // Generate strengths based on actual data
  const strengths: string[] = [];
  
  // Add top languages
  strengths.push(...skills.languages.slice(0, 2));
  
  // Add top frameworks
  if (skills.frameworks.length > 0) {
    strengths.push(...skills.frameworks.slice(0, 2));
  }
  
  // Add special achievements
  if (totalStars > 500) {
    strengths.push("Open Source Leadership");
  } else if (hasOpenSource) {
    strengths.push("Open Source Contributor");
  }
  
  if (skills.tools.includes("Docker") || skills.tools.includes("Kubernetes")) {
    strengths.push("DevOps & Infrastructure");
  }
  
  if (hasRecentActivity) {
    strengths.push("Active Maintainer");
  }

  return {
    tagline: tagline.slice(0, 100), // Ensure max length
    summary,
    strengths: strengths.slice(0, 5), // Top 5 strengths
    careerLevel,
  };
}
