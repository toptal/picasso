import type { ReactNode } from 'react'
import React, { Children, forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twJoin, twMerge } from '@toptal/picasso-tailwind-merge'

import { classBySize, classByVariant } from './styles'

export type VariantType = 'white' | 'red'
export type SizeType = 'medium' | 'small' | 'large'

export interface Props extends BaseProps {
  /** The `Badge` content */
  content: number
  /** Variant of the `Badge` */
  variant?: VariantType
  /** Size of the `Badge` */
  size?: SizeType
  /** Max count to show. By default 9 for small size, 99 for other sizes */
  max?: number
  /** The badged will be overlaid on it's children */
  children?: ReactNode
}

const thresholds: Record<SizeType, number> = {
  small: 9,
  medium: 99,
  large: 99,
}

export const Badge = forwardRef<HTMLSpanElement, Props>(function Badge(
  {
    children,
    style,
    variant = 'white',
    size = 'large',
    content,
    className,
    max,
    'data-testid': testId,
  },
  ref
) {
  const hasChildren = Children.count(children) > 0
  const threshold = max ?? thresholds[size]
  const displayContent = content > threshold ? `${threshold}+` : `${content}`

  return (
    <span
      ref={ref}
      data-testid={testId}
      style={style}
      className={twMerge(
        `inline-flex shrink-0 content-middle flex-nowrap justify-normal
        text-[10px] font-semibold leading-3 align-middle text-graphite-700`,
        hasChildren ? 'relative' : 'static',
        className
      )}
    >
      {children}
      <span
        className={twJoin(
          `border-solid items-center content-center inline-flex flex-nowrap
          justify-center z-[1] border rounded-full`,
          classByVariant[variant],
          hasChildren
            ? 'absolute right-0 top-0 translate-x-[50%] translate-y-[-50%]'
            : 'static',
          classBySize[size]
        )}
      >
        {displayContent}
      </span>
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge
