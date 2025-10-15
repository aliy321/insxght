import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      className={clsx('fill-primary', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.000970473 42.6418L0.000971204 51H25.5001V29.0429C25.5001 41.1695 35.359 51 47.5203 51H51V25.5H33.8088C43.3035 25.5 51 17.8256 51 8.35809V0L25.5001 2.23819e-06V21.957C25.5001 9.83056 15.6411 3.07698e-06 3.47978 4.1611e-06L0 4.43989e-06L2.22924e-06 25.5H17.1913C7.69646 25.5 2.90015e-06 33.1743 3.72782e-06 42.6418H0.000970473Z" />
    </svg>
  )
}
