import React, { forwardRef, ImgHTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { mergeClasses, StandardProps } from '@toptal/picasso-shared'

import styles from './styles'

type VariantType = 'rectangle' | 'circular'

export interface Props
  extends StandardProps,
    ImgHTMLAttributes<HTMLImageElement> {
  /** Image alt text */
  alt: string
  /** Image url */
  src: string
  /** A set of image sources */
  srcSet?: string
  /** Image shape type */
  variant?: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoImage' })

export const Image = forwardRef<HTMLImageElement, Props>(function Image(
  props,
  ref
) {
  const {
    src,
    srcSet,
    alt,
    classes: externalClasses,
    className,
    variant = 'rectangle',
    style,
    ...rest
  } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return (
    <img
      // eslint-disable-next-line react/jsx-props-no-spreading
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
