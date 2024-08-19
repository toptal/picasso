import type { ImgHTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

type VariantType = 'rectangle' | 'circular'

export interface Props extends BaseProps, ImgHTMLAttributes<HTMLImageElement> {
  /** Image alt text */
  alt: string
  /** Image url */
  src: string
  /** A set of image sources */
  srcSet?: string
  /** Image shape type */
  variant?: VariantType
}

export const Image = forwardRef<HTMLImageElement, Props>(function Image(
  props,
  ref
) {
  const {
    src,
    srcSet,
    alt,
    className,
    variant = 'rectangle',
    style,
    ...rest
  } = props

  return (
    <img
      {...rest}
      ref={ref}
      src={src}
      srcSet={srcSet}
      alt={alt}
      className={twMerge(
        variant === 'circular' && 'rounded-full',
        'block',
        className
      )}
      style={style}
    />
  )
})

Image.defaultProps = {
  variant: 'rectangle',
}

Image.displayName = 'Image'

export default Image
