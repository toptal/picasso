import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps {
  children: React.ReactNode
  as?: 'section' | 'header' | 'div'
}

export const Hero = forwardRef<HTMLElement, Props>(function Hero(
  { children, className, as: Component = 'section', ...rest },
  ref
) {
  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={twMerge(
        'flex flex-col items-start gap-4 px-8 py-16 bg-white rounded-lg',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
})

Hero.displayName = 'Hero'

export default Hero
