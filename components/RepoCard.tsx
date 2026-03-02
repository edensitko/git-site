import { GitHubRepo } from "@/lib/types";

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block glass rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:border-blue-200/50 dark:hover:border-blue-500/50"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {repo.name}
        </h3>
        {repo.language && (
          <span className="px-3 py-1 bg-blue-100/70 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium backdrop-blur-sm">
            {repo.language}
          </span>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || "No description provided"}
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🔱</span>
          <span>{repo.forks_count}</span>
        </div>
        {repo.open_issues_count > 0 && (
          <div className="flex items-center gap-1">
            <span>📋</span>
            <span>{repo.open_issues_count}</span>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-400 dark:text-gray-500 mb-3">
        Updated {updatedDate}
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-gray-100/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 rounded text-xs backdrop-blur-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {repo.license && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          📄 {repo.license.name}
        </div>
      )}
    </a>
  );
}
