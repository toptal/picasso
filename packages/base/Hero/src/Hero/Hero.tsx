import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

type Variant = 'filled' | 'outlined' | 'subtle'
type Color = 'blue' | 'green'

export interface Props extends BaseProps {
  children: React.ReactNode
  variant?: Variant
  color?: Color
  as?: 'section' | 'header' | 'div'
}

const baseStyles =
  'flex flex-col items-start gap-4 px-8 py-16 rounded-lg border border-solid'

const styles: Record<Variant, Record<Color, string>> = {
  filled: {
    blue: 'bg-blue-500 border-blue-500 text-white',
    green: 'bg-green-500 border-green-500 text-white',
  },
  outlined: {
    blue: 'bg-white border-blue-500 text-blue-700',
    green: 'bg-white border-green-500 text-green-700',
  },
  subtle: {
    blue: 'bg-blue-50 border-blue-100 text-blue-900',
    green: 'bg-green-50 border-green-100 text-green-900',
  },
}

export const Hero = forwardRef<HTMLElement, Props>(function Hero(
  {
    children,
    className,
    variant = 'filled',
    color = 'blue',
    as: Component = 'section',
    ...rest
  },
  ref
) {
  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={twMerge(baseStyles, styles[variant][color], className)}
      {...rest}
    >
      {children}
    </Component>
  )
})

Hero.displayName = 'Hero'

export default Hero
