'use client'

import GitHubCalendar from 'react-github-calendar'
import BlurFade from '@/components/magicui/blur-fade'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { useTheme } from './providers/Theme'

interface GitHubContributionsProps {
  username: string
  className?: string
}

export function GitHubContributions({ username, className = '' }: GitHubContributionsProps) {
  const { theme, setTheme } = useTheme()

  return (
    <BlurFade delay={0.1}>
      <div className={`react-github-calendar ${className}`}>
        {/* <div>
                    <h2 className="text-lg font-semibold">{username} on GitHub</h2>
                </div> */}
        <ScrollArea className="w-svw lg:w-full p-4 rounded-lg whitespace-nowrap">
          <GitHubCalendar
            username={username}
            blockSize={12}
            blockMargin={2}
            fontSize={14}
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </BlurFade>
  )
}
