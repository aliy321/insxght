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
          <Link href={website} {...getExternalLinkProps(website)}>
            <Link2 className="w-4 h-4" />
          </Link>
        </div>
      )}
    </li>
  )
}
