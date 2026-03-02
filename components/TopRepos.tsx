import { GitHubRepo } from "@/lib/types";

interface TopReposProps {
  mostStarred: GitHubRepo | null;
  mostForked: GitHubRepo | null;
}

export default function TopRepos({ mostStarred, mostForked }: TopReposProps) {
  if (!mostStarred && !mostForked) return null;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 mb-8 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Top Repositories</h3>
      
      <div className="space-y-4">
        {mostStarred && mostStarred.stargazers_count > 0 && (
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Most Starred</div>
            <a
              href={mostStarred.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {mostStarred.name}
            </a>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>⭐ {mostStarred.stargazers_count}</span>
              {mostStarred.language && (
                <span>• {mostStarred.language}</span>
              )}
            </div>
          </div>
        )}

        {mostForked && mostForked.forks_count > 0 && (
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Most Forked</div>
            <a
              href={mostForked.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {mostForked.name}
            </a>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
              <span>🔱 {mostForked.forks_count}</span>
              {mostForked.language && (
                <span>• {mostForked.language}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
