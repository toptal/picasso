import React from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'
import { Button } from '@toptal/picasso-button'

export interface Props extends StandardProps {
  activePage: number
  disabled?: boolean
  page: number
  onClick: (page: number) => void
}

const PaginationButton = (props: Props) => {
  const { page, activePage, disabled, onClick, className } = props
  const isActive = page === activePage

  const finalClassName = twMerge(
    'min-w-[1.5em] px-[0.3em] ',
    'active:bg-graphite-700 active:border-graphite-700 active:text-white',
    isActive && 'bg-graphite-700 border-graphite-700 text-white',
    'disabled:text-graphite-700',
    disabled && 'text-graphite-700',
    className
  )

  return (
    <Button
      className={finalClassName}
      aria-current={isActive}
      active={isActive}
      disabled={disabled}
      onClick={() => onClick(page)}
      variant='secondary'
      size='small'
    >
      {page}
    </Button>
  )
}

export default PaginationButton
