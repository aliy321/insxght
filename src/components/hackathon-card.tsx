import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Link2 } from 'lucide-react'
import { getExternalLinkProps } from '@/utilities/isExternalUrl'

interface Props {
  title?: string
  description?: string | DefaultTypedEditorState
  image?: string
  website?: string
}

export function HackathonCard({ title, description, image, website }: Props) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title?.[0] || ''}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-2">
        <h2 className="font-semibold leading-none">{title}</h2>
        {typeof description === 'string' ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : description ? (
          <RichText
            data={description}
            className="prose dark:prose-invert text-sm text-muted-foreground"
            enableGutter={false}
            enableProse={false}
          />
        ) : null}
      </div>
      {website && (
        <div className="mt-4 flex flex-row flex-wrap items-start gap-2">
          <Link
            href={website}
            {...getExternalLinkProps(website)}
            className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors rounded-md border border-border hover:border-primary/50 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-fit"
            aria-label={`Visit ${title} website`}
          >
            <Link2 className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="text-xs">Visit Website</span>
            <svg
              className="absolute -right-1.5 -top-1.5 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background rounded-full p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      )}
    </li>
  )
}
