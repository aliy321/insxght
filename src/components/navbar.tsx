import { Dock, DockIcon } from '@/components/magicui/dock'
import { ModeToggle } from '@/components/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { whitelabel } from '@/config/whitelabel'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
      {/* Navbar content */}
      <div className="mx-auto mb-2 sm:mb-4 flex justify-center h-16 w-full max-w-fit">
        <Dock className="flex h-full items-center px-2 sm:px-4 py-2 bg-background/90 rounded-2xl border border-white/20 [box-shadow:0_8px_32px_rgba(0,0,0,0.4)]">
          {whitelabel.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-10 sm:size-12',
                    )}
                  >
                    <item.icon className="size-3 sm:size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
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
