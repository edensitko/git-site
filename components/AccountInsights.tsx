import { GitHubUser, GitHubRepo } from "@/lib/types";

interface AccountInsightsProps {
  user: GitHubUser;
  repos: GitHubRepo[];
  totalStars: number;
  totalForks: number;
}

export default function AccountInsights({
  user,
  repos,
  totalStars,
  totalForks,
}: AccountInsightsProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const avgStarsPerRepo = repos.length > 0 ? Math.round(totalStars / repos.length) : 0;

  return (
    <div className="glass rounded-2xl shadow-lg p-6 transition-colors">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Account Insights</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{joinDate}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Since</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalStars}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Stars</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalForks}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Forks</div>
        </div>
        
        <div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{avgStarsPerRepo}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Stars/Repo</div>
        </div>

        {user.public_gists > 0 && (
          <div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{user.public_gists}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Public Gists</div>
          </div>
        )}
      </div>
    </div>
  );
}
