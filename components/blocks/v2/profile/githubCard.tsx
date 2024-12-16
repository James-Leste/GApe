'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Search } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ContributionDay = {
  contributionCount: number
  date: string
}

type ContributionWeek = {
  contributionDays: ContributionDay[]
}

type GitHubData = {
  data: {
    user: {
      name: string
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: ContributionWeek[]
        }
      }
    }
  }
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const filterLast6Months = (contributions: ContributionDay[]) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  return contributions.filter(day => new Date(day.date) >= sixMonthsAgo);
};

const getColor = (count: number) => {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
  if (count < 5) return 'bg-green-200 dark:bg-green-900'
  if (count < 10) return 'bg-green-300 dark:bg-green-700'
  if (count < 15) return 'bg-green-400 dark:bg-green-600'
  return 'bg-green-500 dark:bg-green-500'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${DAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

export default function GitHubContributionGraph() {
  const [username, setUsername] = useState('')
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [userData, setUserData] = useState<{ name: string, totalContributions: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const graphRef = useRef<HTMLDivElement>(null)

  const fetchContributions = async () => {
    if (!username.trim()) return
    setLoading(true)
    setError(null)
    setUserData(null)
    setContributions([])
    try {
      const response = await fetch(`/api/github-contributions?username=${username}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch GitHub data')
      }
      const data: GitHubData = await response.json()
      const allContributions = data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        week => week.contributionDays
      )
      const last6MonthsContributions = filterLast6Months(allContributions);
      setContributions(last6MonthsContributions)
      setUserData({
        name: data.data.user.name || username,
        totalContributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions
      })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const getDisplayedMonths = () => {
    const months = new Set();
    contributions.forEach(day => {
      const date = new Date(day.date);
      months.add(MONTHS[date.getUTCMonth()]);
    });
    return Array.from(months) as string[];
  };

  const getWeeks = () => {
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
    return weeks;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!graphRef.current || !hoveredDay) return
      const currentIndex = contributions.findIndex(day => day.date === hoveredDay.date)
      let newIndex = currentIndex

      switch (e.key) {
        case 'ArrowLeft':
          newIndex = Math.max(0, currentIndex - 7)
          break
        case 'ArrowRight':
          newIndex = Math.min(contributions.length - 1, currentIndex + 7)
          break
        case 'ArrowUp':
          newIndex = Math.max(0, currentIndex - 1)
          break
        case 'ArrowDown':
          newIndex = Math.min(contributions.length - 1, currentIndex + 1)
          break
        default:
          return
      }

      if (newIndex !== currentIndex) {
        setHoveredDay(contributions[newIndex])
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hoveredDay, contributions])

  return (
    <div className="w-full max-w-md p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
          className="flex-grow mr-2"
          onKeyPress={(e) => e.key === 'Enter' && fetchContributions()}
        />
        <Button onClick={fetchContributions} disabled={loading} size="icon">
          {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Search className="h-4 w-4" />}
        </Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {userData && (
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">{userData.name}</h2>
          <p className="text-sm text-muted-foreground">{userData.totalContributions} contributions in the last year</p>
        </div>
      )}
      {contributions.length > 0 && (
        <div className="relative" ref={graphRef}>
          <div className="flex mb-1 text-xs text-gray-500 dark:text-gray-400" style={{marginLeft: '20px', width: 'calc(100% - 20px)'}}>
            {getDisplayedMonths().map((month, index) => (
              <div key={month} style={{width: `${100 / getDisplayedMonths().length}%`}} className="text-center">{month}</div>
            ))}
          </div>
          <div className="flex">
            <div className="flex flex-col mr-1 text-xs text-gray-500 dark:text-gray-400" style={{width: '20px'}}>
              {DAYS.map((day, index) => (
                <div key={day} className="h-[10px] flex items-center">{index % 2 === 0 ? day[0] : ''}</div>
              ))}
            </div>
            <div className="inline-flex gap-[1px] flex-1">
              {getWeeks().map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[1px] flex-1">
                  {week.map((day, dayIndex) => (
                    <TooltipProvider key={day.date}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-full h-[10px] ${getColor(day.contributionCount)} ${hoveredDay?.date === day.date ? 'ring-1 ring-blue-500' : ''}`}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            tabIndex={0}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{formatDate(day.date)}</p>
                          <p>{day.contributionCount} contributions</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 4, 9, 14, 20].map((count) => (
            <div key={count} className={`w-3 h-3 ${getColor(count)}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

