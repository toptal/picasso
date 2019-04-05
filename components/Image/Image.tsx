import React, { CSSProperties } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import styles from './styles'

type VariantType = 'default' | 'circular'

export interface Props {
  /** Image alt text */
  alt: string
  classes: Classes
  className?: string
  /** Image url */
  src: string
  /** A set of image sources */
  srcSet?: string
  /** Image shape type */
  variant?: VariantType
  style?: CSSProperties
}

export const Image: React.FunctionComponent<Props> = props => {
  const { src, srcSet, alt, classes, className, variant, style } = props

  return (
    <img
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
}

Image.defaultProps = {
  variant: 'default'
}

Image.displayName = 'Image'

export default withStyles(styles)(Image)
