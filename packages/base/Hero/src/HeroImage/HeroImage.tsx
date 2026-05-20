import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props
  extends BaseProps,
    Omit<
      React.ImgHTMLAttributes<HTMLImageElement>,
      'className' | 'style' | 'alt'
    > {
  src: string
  imageAlt: string
}

export const HeroImage = forwardRef<HTMLImageElement, Props>(function HeroImage(
  { className, src, imageAlt, ...rest },
  ref
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={imageAlt}
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
