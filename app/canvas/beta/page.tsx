import GitHubContributionGraph from '@/components/blocks/v2/profile/githubCard'

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <GitHubContributionGraph />
      </main>
    )
  }
  
