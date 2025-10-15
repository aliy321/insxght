import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { StructuredData } from './StructuredData'

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <>
      {/* Structured Data for Breadcrumbs */}
      <StructuredData
        type="breadcrumbs"
        data={items.map((item) => ({ name: item.label, url: item.href }))}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-2 text-sm bg-gray-50 px-4 py-2 rounded-md ${className}`}
      >
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            {item.isCurrent ? (
              <span className="text-gray-700 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-800 transition-colors underline"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
