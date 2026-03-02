import { GitHubRepo } from "./types";

export interface RepoCategory {
  name: string;
  icon: string;
  repos: GitHubRepo[];
}

/**
 * Categorize repositories based on topics, languages, and descriptions
 * @param repos - Array of user's repositories
 * @returns Array of categorized repositories
 */
export function categorizeRepos(repos: GitHubRepo[]): RepoCategory[] {
  const categories: Record<string, { icon: string; repos: GitHubRepo[] }> = {
    "GitHub Actions": { icon: "⚡", repos: [] },
    "AI & ML": { icon: "🤖", repos: [] },
    "React & UI": { icon: "⚛️", repos: [] },
    "TypeScript Projects": { icon: "🔷", repos: [] },
    "Python Packages": { icon: "🐍", repos: [] },
    "Node.js & JavaScript": { icon: "⚙️", repos: [] },
    "Web Frameworks": { icon: "🌐", repos: [] },
    "DevOps & Infra": { icon: "🔧", repos: [] },
    "Cloud & Hosting": { icon: "☁️", repos: [] },
    "Databases & Data": { icon: "🗄️", repos: [] },
    "CLI Tools": { icon: "💻", repos: [] },
    "Testing & QA": { icon: "🧪", repos: [] },
    "Mobile Apps": { icon: "📱", repos: [] },
    "Golang & Rust": { icon: "🦀", repos: [] },
    "Games & Graphics": { icon: "🎮", repos: [] },
    "Documentation": { icon: "📚", repos: [] },
    "Other Projects": { icon: "📁", repos: [] },
  };

  repos.forEach((repo) => {
    const topics = repo.topics || [];
    const description = (repo.description || "").toLowerCase();
    const name = repo.name.toLowerCase();
    const language = repo.language || "";

    // GitHub Actions
    if (
      topics.includes("github-actions") ||
      topics.includes("actions") ||
      name.includes("workflow") ||
      name.includes("action")
    ) {
      categories["GitHub Actions"].repos.push(repo);
    }
    // AI & ML
    else if (
      topics.includes("ai") ||
      topics.includes("ml") ||
      topics.includes("machine-learning") ||
      topics.includes("artificial-intelligence") ||
      topics.includes("openai") ||
      description.includes("ai ") ||
      description.includes("machine learning")
    ) {
      categories["AI & ML"].repos.push(repo);
    }
    // Testing & QA
    else if (
      topics.includes("testing") ||
      topics.includes("test") ||
      topics.includes("jest") ||
      topics.includes("pytest") ||
      topics.includes("selenium") ||
      description.includes("testing framework") ||
      description.includes("test") ||
      name.includes("test") ||
      name.includes("spec")
    ) {
      categories["Testing & QA"].repos.push(repo);
    }
    // React & UI
    else if (
      topics.includes("react") ||
      topics.includes("nextjs") ||
      topics.includes("vue") ||
      topics.includes("svelte") ||
      topics.includes("ui") ||
      topics.includes("design-system") ||
      language === "CSS" ||
      language === "HTML"
    ) {
      categories["React & UI"].repos.push(repo);
    }
    // Databases & Data
    else if (
      topics.includes("database") ||
      topics.includes("postgres") ||
      topics.includes("mongodb") ||
      topics.includes("redis") ||
      topics.includes("elasticsearch") ||
      topics.includes("sql") ||
      language === "PLPGSQL"
    ) {
      categories["Databases & Data"].repos.push(repo);
    }
    // Games & Graphics
    else if (
      topics.includes("game") ||
      topics.includes("unity") ||
      topics.includes("unreal") ||
      topics.includes("graphics") ||
      topics.includes("3d") ||
      language === "C#" ||
      language === "C++"
    ) {
      categories["Games & Graphics"].repos.push(repo);
    }
    // Documentation
    else if (
      topics.includes("documentation") ||
      topics.includes("docs") ||
      topics.includes("blog") ||
      name.includes("wiki") ||
      name.includes("docs") ||
      name.includes("blog")
    ) {
      categories["Documentation"].repos.push(repo);
    }
    // TypeScript
    else if (language === "TypeScript") {
      categories["TypeScript Projects"].repos.push(repo);
    }
    // Python
    else if (language === "Python" || topics.includes("python")) {
      categories["Python Packages"].repos.push(repo);
    }
    // Node.js & JavaScript
    else if (
      language === "JavaScript" ||
      topics.includes("nodejs") ||
      topics.includes("npm") ||
      name.includes("server")
    ) {
      categories["Node.js & JavaScript"].repos.push(repo);
    }
    // Web Frameworks
    else if (
      topics.includes("django") ||
      topics.includes("rails") ||
      topics.includes("laravel") ||
      topics.includes("spring") ||
      topics.includes("fastapi") ||
      topics.includes("express") ||
      language === "Java" ||
      language === "Ruby" ||
      language === "PHP" ||
      language === ".NET"
    ) {
      categories["Web Frameworks"].repos.push(repo);
    }
    // Golang & Rust
    else if (
      language === "Go" ||
      language === "Rust" ||
      topics.includes("golang") ||
      topics.includes("rust")
    ) {
      categories["Golang & Rust"].repos.push(repo);
    }
    // Cloud & Hosting
    else if (
      topics.includes("aws") ||
      topics.includes("azure") ||
      topics.includes("gcp") ||
      topics.includes("cloud") ||
      topics.includes("serverless") ||
      description.includes("cloud") ||
      description.includes("deployment")
    ) {
      categories["Cloud & Hosting"].repos.push(repo);
    }
    // DevOps & Infra
    else if (
      topics.includes("devops") ||
      topics.includes("terraform") ||
      topics.includes("ansible") ||
      topics.includes("kubernetes") ||
      topics.includes("docker") ||
      topics.includes("infrastructure") ||
      language === "HCL" ||
      name.includes("terraform") ||
      name.includes("ansible")
    ) {
      categories["DevOps & Infra"].repos.push(repo);
    }
    // CLI Tools
    else if (
      topics.includes("cli") ||
      topics.includes("command-line") ||
      language === "Shell" ||
      name.includes("cli") ||
      name.includes("tool")
    ) {
      categories["CLI Tools"].repos.push(repo);
    }
    // Mobile Apps
    else if (
      topics.includes("flutter") ||
      topics.includes("react-native") ||
      topics.includes("mobile") ||
      language === "Dart" ||
      language === "Swift" ||
      language === "Kotlin"
    ) {
      categories["Mobile Apps"].repos.push(repo);
    }
    // Other
    else {
      categories["Other Projects"].repos.push(repo);
    }
  });

  // Convert to array and filter out empty categories
  return Object.entries(categories)
    .map(([name, { icon, repos }]) => ({
      name,
      icon,
      repos: repos.sort((a, b) => b.stargazers_count - a.stargazers_count),
    }))
    .filter((category) => category.repos.length > 0);
}
