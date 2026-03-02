"use client";

import { useState } from "react";
import { GitHubRepo } from "@/lib/types";

interface ProjectsByCategoryProps {
  repos: GitHubRepo[];
}

const categoryIcons: Record<string, string> = {
  "GitHub Actions": "⚡",
  "Python Packages": "🐍",
  "AI & ML": "🤖",
  "TypeScript Projects": "🔷",
  "React & UI": "⚛️",
  "DevOps & Infra": "🔧",
  "CLI Tools": "💻",
  "Web Apps": "🌐",
  "Mobile Apps": "📱",
  "Other Projects": "📁",
};

function categorizeRepos(repos: GitHubRepo[]) {
  const categories: Record<string, GitHubRepo[]> = {};

  repos.forEach((repo) => {
    let category = "Other Projects";
    const topics = repo.topics || [];
    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();

    if (topics.includes("github-actions") || topics.includes("actions") || name.includes("workflow")) {
      category = "GitHub Actions";
    } else if (repo.language === "Python" || topics.includes("python")) {
      category = "Python Packages";
    } else if (
      topics.includes("ai") ||
      topics.includes("ml") ||
      topics.includes("machine-learning") ||
      topics.includes("artificial-intelligence") ||
      desc.includes("ai ") ||
      desc.includes("openai")
    ) {
      category = "AI & ML";
    } else if (repo.language === "TypeScript" && !topics.includes("react") && !topics.includes("nextjs")) {
      category = "TypeScript Projects";
    } else if (
      topics.includes("react") ||
      topics.includes("nextjs") ||
      topics.includes("vue") ||
      topics.includes("ui") ||
      repo.language === "CSS" ||
      repo.language === "HTML"
    ) {
      category = "React & UI";
    } else if (
      topics.includes("devops") ||
      topics.includes("docker") ||
      topics.includes("kubernetes") ||
      topics.includes("terraform") ||
      topics.includes("ansible") ||
      topics.includes("jenkins") ||
      repo.language === "HCL" ||
      repo.language === "Dockerfile"
    ) {
      category = "DevOps & Infra";
    } else if (topics.includes("cli") || topics.includes("terminal") || repo.language === "Shell") {
      category = "CLI Tools";
    } else if (topics.includes("mobile") || topics.includes("flutter") || repo.language === "Dart") {
      category = "Mobile Apps";
    } else if (topics.includes("webapp") || topics.includes("website")) {
      category = "Web Apps";
    }

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(repo);
  });

  return Object.entries(categories)
    .sort(([, a], [, b]) => b.length - a.length)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, GitHubRepo[]>);
}

export default function ProjectsByCategory({ repos }: ProjectsByCategoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const categories = categorizeRepos(repos);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredCategories = Object.entries(categories).reduce((acc, [category, categoryRepos]) => {
    const filtered = categoryRepos.filter((repo) => {
      const query = searchQuery.toLowerCase();
      return (
        repo.name.toLowerCase().includes(query) ||
        (repo.description || "").toLowerCase().includes(query) ||
        (repo.language || "").toLowerCase().includes(query) ||
        repo.topics.some((topic) => topic.toLowerCase().includes(query))
      );
    });

    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, GitHubRepo[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold dark:text-white">Projects by Category</h2>
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {Object.keys(filteredCategories).length === 0 && (
        <div className="text-center py-12 glass rounded-2xl shadow-lg">
          <p className="text-gray-500 dark:text-gray-400">No projects found matching "{searchQuery}"</p>
        </div>
      )}

      {Object.entries(filteredCategories).map(([category, categoryRepos]) => {
        const isExpanded = expandedCategories[category];
        const displayRepos = isExpanded ? categoryRepos : categoryRepos.slice(0, 5);
        const hasMore = categoryRepos.length > 5;

        return (
          <div key={category} className="glass rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{categoryIcons[category] || "📦"}</span>
              <h3 className="text-xl font-bold dark:text-white">{category}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {categoryRepos.length}
              </span>
            </div>

            <div className="space-y-2">
              {displayRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                          {repo.name}
                        </h4>
                        {repo.language && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100/70 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 rounded backdrop-blur-sm whitespace-nowrap">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      {repo.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                          {repo.description}
                        </p>
                      )}
                    </div>
                    {repo.stargazers_count > 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        ⭐ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {hasMore && (
              <button
                onClick={() => toggleCategory(category)}
                className="mt-3 px-4 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                {isExpanded
                  ? "Show less"
                  : `Show ${categoryRepos.length - 5} more`}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
