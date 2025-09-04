import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Paper elevation shadow */
  elevation?: number
  children: ReactNode
}

// TODO: [FX-5003] Deprecate legacy shadow classes
const shadowsMapping: Record<number, string> = {
  0: 'shadow-0',
  1: 'shadow-1',
  2: 'shadow-2',
  3: 'shadow-3',
  4: 'shadow-4',
  5: 'shadow-5',
  6: 'shadow-6',
  7: 'shadow-7',
  8: 'shadow-8',
  9: 'shadow-9',
  10: 'shadow-10',
  11: 'shadow-11',
  12: 'shadow-12',
  13: 'shadow-13',
  14: 'shadow-14',
  15: 'shadow-15',
  16: 'shadow-16',
  17: 'shadow-17',
  18: 'shadow-18',
  19: 'shadow-19',
  20: 'shadow-20',
  21: 'shadow-21',
  22: 'shadow-22',
  23: 'shadow-23',
  24: 'shadow-24',
}

export const Paper = forwardRef<HTMLDivElement, Props>(function Paper(
  { elevation = 1, ...props },
  ref
) {
  const { className, style, children, ...rest } = props

  return (
    <div
      ref={ref}
      className={twMerge(
        'bg-white',
        shadowsMapping[elevation],
        'transition-shadow duration-300 delay-0',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
})

Paper.displayName = 'Paper'

export default Paper
