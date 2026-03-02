import { GitHubRepo } from "@/lib/types";
import Link from "next/link";

interface RepoInsightsProps {
  insights: {
    mostStarred: GitHubRepo | null;
    mostForked: GitHubRepo | null;
    totalStars: number;
    totalForks: number;
    avgStarsPerRepo: number;
  };
}

export default function RepoInsights({ insights }: RepoInsightsProps) {
  return (
    <div className="glass rounded-2xl shadow-lg p-6 mb-8 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">📊 Repository Insights</h3>
      
{insights.mostStarred && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            🌟 Most Starred Repository
          </h4>
          <Link
            href={insights.mostStarred.html_url}
            target="_blank"
            className="block p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
          >
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {insights.mostStarred.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {insights.mostStarred.description || "No description"}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
              <span>⭐ {insights.mostStarred.stargazers_count}</span>
              <span>🔱 {insights.mostStarred.forks_count}</span>
            </div>
          </Link>
        </div>
      )}

      {insights.mostForked && insights.mostForked.id !== insights.mostStarred?.id && (
        <div>
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            🔱 Most Forked Repository
          </h4>
          <Link
            href={insights.mostForked.html_url}
            target="_blank"
            className="block p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
          >
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {insights.mostForked.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {insights.mostForked.description || "No description"}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-500">
              <span>⭐ {insights.mostForked.stargazers_count}</span>
              <span>🔱 {insights.mostForked.forks_count}</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
