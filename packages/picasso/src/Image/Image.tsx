import React, { forwardRef, ImgHTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'

import styles from './styles'

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

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoImage' })

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
  const classes = useStyles()

  return (
    <img
      {...rest}
      ref={ref}
      src={src}
      srcSet={srcSet}
      alt={alt}
      className={cx(
        {
          [classes.circular]: variant === 'circular'
        },
        classes.root,
        className
      )}
      style={style}
    />
  )
})

Image.defaultProps = {
  variant: 'rectangle'
}

Image.displayName = 'Image'

export default Image
