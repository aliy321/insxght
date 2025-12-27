'use client'

import { Dock, DockIcon } from '@/components/magicui/dock'
import { ModeToggle } from '@/components/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { whitelabel } from '@/config/whitelabel'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { ArrowUp, FileText } from 'lucide-react'
import type { Resume as ResumeType, Media } from '@/payload-types'

function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DockIcon>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={scrollToTop}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-10 sm:size-12')}
            aria-label="Back to top"
          >
            <ArrowUp className="size-3 sm:size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Back to top</p>
        </TooltipContent>
      </Tooltip>
    </DockIcon>
  )
}

interface ResumeButtonProps {
  resumeData: ResumeType | null
}

function ResumeButton({ resumeData }: ResumeButtonProps) {
  if (!resumeData?.enabled || !resumeData?.resumeFile) {
    return null
  }

  const resumeFile = resumeData.resumeFile as Media
  const resumeUrl = typeof resumeFile === 'object' ? resumeFile.url : null
  const fileName = typeof resumeFile === 'object' ? resumeFile.filename : 'resume.pdf'

  if (!resumeUrl) {
    return null
  }

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(resumeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || 'resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading resume:', error)
      // Fallback to direct link
      window.open(resumeUrl, '_blank')
    }
  }

  return (
    <DockIcon>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={resumeUrl}
            onClick={handleDownload}
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-10 sm:size-12')}
            aria-label="Download Resume"
          >
            <FileText className="size-3 sm:size-4" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>{resumeData.buttonText || 'Resume'}</p>
        </TooltipContent>
      </Tooltip>
    </DockIcon>
  )
}

interface NavbarProps {
  resumeData?: ResumeType | null
}

export default function Navbar({ resumeData }: NavbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
      {/* Navbar content */}
      <div className="mx-auto mb-2 sm:mb-4 flex justify-center h-16 w-full max-w-fit">
        <Dock className="flex h-full items-center px-2 sm:px-4 py-2 bg-background/90 rounded-2xl border border-white/20 [box-shadow:0_8px_32px_rgba(0,0,0,0.4)]">
          <BackToTopButton />
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(whitelabel.socialMedia)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                        'size-10 sm:size-12',
                      )}
                    >
                      <social.icon className="size-3 sm:size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <ResumeButton resumeData={resumeData ?? null} />
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </div>
    </div>
  )
}
