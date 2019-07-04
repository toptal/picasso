import React, { FunctionComponent, ImgHTMLAttributes } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

type VariantType = 'default' | 'circular'

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

export const Image: FunctionComponent<Props> = ({
  src,
  srcSet,
  alt,
  classes,
  className,
  variant,
  style,
  ...rest
}) => (
  <img
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
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

Image.defaultProps = {
  variant: 'default'
}

Image.displayName = 'Image'

export default withStyles(styles)(Image)
