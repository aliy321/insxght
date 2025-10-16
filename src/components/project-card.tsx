import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getExternalLinkProps } from '@/utilities/isExternalUrl'

interface ProjectCardProps {
  title: string
  description: string
  dates: string
  tags: string[]
  image?: string
  video?: string
  links?: {
    github?: string
    live?: string
  }
}

export function ProjectCard({
  title,
  description,
  dates,
  tags,
  image,
  video,
  links,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {(image || video) && (
          <div className="relative aspect-video overflow-hidden">
            {video ? (
              <video
                src={video}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              image && <Image src={image} alt={title} fill className="object-cover" />
            )}
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">{title}</h3>
            <span className="text-xs text-muted-foreground">{dates}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          {links && (
            <div className="flex gap-2">
              {links.github && (
                <Link
                  href={links.github}
                  className="text-xs text-blue-500 hover:underline"
                  {...getExternalLinkProps(links.github)}
                >
                  GitHub
                </Link>
              )}
              {links.live && (
                <Link
                  href={links.live}
                  className="text-xs text-blue-500 hover:underline"
                  {...getExternalLinkProps(links.live)}
                >
                  Live Demo
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
