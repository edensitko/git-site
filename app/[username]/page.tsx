import { notFound } from "next/navigation";
import { fetchGitHubUser, fetchGitHubRepos, fetchGitHubOrgs } from "@/lib/github";
import { detectSkillsFromRepos, calculateRepoInsights } from "@/lib/analyzer";
import { calculateLanguageStats, getMostStarredRepo, getMostForkedRepo } from "@/lib/stats";
import { categorizeRepos } from "@/lib/categorizer";
import { generateAISummary } from "@/lib/ai-summary";
import ProfileHeader from "@/components/ProfileHeader";
import StatsBar from "@/components/StatsBar";
import TechStackCarousel from "@/components/TechStackCarousel";
import AIDeveloperSummary from "@/components/AIDeveloperSummary";
import LanguageChart from "@/components/LanguageChart";
import TopRepos from "@/components/TopRepos";
import Organizations from "@/components/Organizations";
import RecentActivity from "@/components/RecentActivity";
import ProjectsByCategory from "@/components/ProjectsByCategory";
import ContributionActivity from "@/components/ContributionActivity";
import ShareSection from "@/components/ShareSection";
import Footer from "@/components/Footer";
import FloatingShareButton from "@/components/FloatingShareButton";

interface PageProps {
  params: {
    username: string;
  };
}

// For static export builds we need to define generateStaticParams
// returning common sample profiles for GitHub Pages export
export async function generateStaticParams() {
  return [
    { username: "edensitko" },
  ];
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = params;

  const [user, repos, orgs] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
    fetchGitHubOrgs(username),
  ]);

  if (!user) {
    notFound();
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const skills = await detectSkillsFromRepos(username, repos);
  const languageStats = calculateLanguageStats(repos);
  const mostStarred = repos.length > 0 ? getMostStarredRepo(repos) : null;
  const mostForked = repos.length > 0 ? getMostForkedRepo(repos) : null;
  const repoInsights = calculateRepoInsights(repos);
  const categories = categorizeRepos(repos);
  
  // Mock contribution stats (would need GitHub events API for real data)
  const contributionStats = {
    totalCommits: repos.reduce((sum, repo) => sum + (repo.size > 0 ? 1 : 0), 0) * 5,
    totalPRs: Math.floor(repos.length * 0.3),
    totalIssues: Math.floor(repos.length * 0.2),
    totalReviews: Math.floor(repos.length * 0.15),
  };
  
  // Generate developer summary
  const aiSummary = await generateAISummary(user, repos, skills);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-200 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader user={user} />
        
        <StatsBar user={user} totalStars={totalStars} />

        <TechStackCarousel skills={skills} />

        <AIDeveloperSummary aiSummary={aiSummary} skills={skills} />
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <LanguageChart stats={languageStats} />
          <div className="flex flex-col gap-4">
            <ContributionActivity stats={contributionStats} />
            <RecentActivity repos={repos} />
          </div>
        </div>

        <TopRepos mostStarred={mostStarred} mostForked={mostForked} />

        <Organizations orgs={orgs} />

<ProjectsByCategory repos={repos} />

        <ShareSection username={username} />

        {repos.length === 0 && (
          <div className="text-center py-12 glass rounded-2xl shadow-lg">
            <p className="text-gray-500 dark:text-gray-400">No public repositories found</p>
          </div>
        )}
      </div>
      <Footer />
      <FloatingShareButton username={username} />
    </div>
  );
}
