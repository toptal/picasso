import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props
  extends BaseProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className' | 'style'> {
  src: string
  alt: string
}

export const HeroImage = forwardRef<HTMLImageElement, Props>(function HeroImage(
  { className, src, alt, ...rest },
  ref
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={twMerge(
        'flex-1 min-w-0 max-w-[50%] h-auto object-cover rounded-lg',
        className
      )}
      {...rest}
    />
  )
})

HeroImage.displayName = 'HeroImage'

export default HeroImage
