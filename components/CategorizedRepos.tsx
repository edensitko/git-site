"use client";

import { useState } from "react";
import Link from "next/link";
import { RepoCategory } from "@/lib/categorizer";

interface CategorizedReposProps {
  categories: RepoCategory[];
}

export default function CategorizedRepos({ categories }: CategorizedReposProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.slice(0, 2).map((c) => c.name))
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  if (categories.length === 0) return null;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 mb-8 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">📂 Repositories by Category</h3>
      <div className="space-y-4">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.name);
          return (
            <div key={category.name} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-semibold dark:text-white">{category.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({category.repos.length})
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-500">
                  {isExpanded ? "▼" : "▶"}
                </span>
              </button>
              
              {isExpanded && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid gap-3">
                    {category.repos.map((repo) => (
                      <Link
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        className="block p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">
                              {repo.name}
                            </div>
                            {repo.description && (
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {repo.description}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
                              {repo.language && (
                                <span className="flex items-center gap-1">
                                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                  {repo.language}
                                </span>
                              )}
                              <span>⭐ {repo.stargazers_count}</span>
                              <span>🔱 {repo.forks_count}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
