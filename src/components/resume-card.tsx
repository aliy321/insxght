import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface ResumeCardProps {
  logoUrl?: string
  altText?: string
  title: string
  subtitle: string
  href?: string
  badges?: string[]
  period: string
  description?: string
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges = [],
  period,
  description,
}: ResumeCardProps) {
  const content = (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-start gap-3">
          {logoUrl && (
            <div className="flex-shrink-0">
              <Image
                src={logoUrl}
                alt={altText || title}
                width={40}
                height={40}
                className="rounded-md"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{title}</h3>
              <span className="text-xs text-muted-foreground">{period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            {description && <p className="text-sm mt-2 text-muted-foreground">{description}</p>}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
