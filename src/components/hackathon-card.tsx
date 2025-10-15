import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface HackathonCardProps {
  title: string
  description: string
  location: string
  dates: string
  image?: string
  links?: {
    github?: string
    live?: string
  }
}

export function HackathonCard({
  title,
  description,
  location,
  dates,
  image,
  links,
}: HackathonCardProps) {
  return (
    <li className="relative pl-6 pb-6">
      <div className="absolute left-0 top-0 h-full w-px bg-border"></div>
      <div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-foreground -translate-x-1/2"></div>
      <Card className="ml-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {image && (
              <div className="flex-shrink-0">
                <Image src={image} alt={title} width={40} height={40} className="rounded-md" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm">{title}</h3>
                <span className="text-xs text-muted-foreground">{dates}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{location}</p>
              <p className="text-sm text-muted-foreground mb-3">{description}</p>
              {links && (
                <div className="flex gap-2">
                  {links.github && (
                    <Link href={links.github} className="text-xs text-blue-500 hover:underline">
                      GitHub
                    </Link>
                  )}
                  {links.live && (
                    <Link href={links.live} className="text-xs text-blue-500 hover:underline">
                      Live Demo
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}
