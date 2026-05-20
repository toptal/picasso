import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  children: React.ReactNode
}

export const HeroContent = forwardRef<HTMLDivElement, Props>(
  function HeroContent({ children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={twMerge('flex flex-col gap-4 flex-1 min-w-0', className)}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

HeroContent.displayName = 'HeroContent'

export default HeroContent
