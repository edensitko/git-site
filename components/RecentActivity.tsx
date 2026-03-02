import { GitHubRepo } from "@/lib/types";

interface RecentActivityProps {
  repos: GitHubRepo[];
}

export default function RecentActivity({ repos }: RecentActivityProps) {
  const recentRepos = [...repos]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  if (recentRepos.length === 0) return null;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 transition-colors">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Recent Activity</h3>
      
      <div className="space-y-3">
        {recentRepos.map((repo) => {
          const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <div key={repo.id} className="flex items-start justify-between">
              <div className="flex-1">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {repo.name}
                </a>
                {repo.language && (
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {repo.language}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                {updatedDate}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
