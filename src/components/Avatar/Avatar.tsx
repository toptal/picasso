import React, { PureComponent } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps, SizeType } from '../Picasso'
import Image from '../Image'
import Logo from '../Logo'
import Typography from '../Typography'
import getNameInitials from '../utils/getNameInitials'
import styles from './styles'

type VariantType = 'square' | 'portrait' | 'landscape'

export interface Props extends StandardProps {
  /** Alt text */
  alt?: string
  /** User full name to display initials on the avatar */
  name: string
  /**
   * Size
   * @default xsmall
   */
  size?: SizeType<'xsmall' | 'small' | 'medium' | 'large'>
  /** Photo url */
  src?: string
  /**
   * Variant of the avatar shape
   * @default square
   */
  variant?: VariantType
}

export class Avatar extends PureComponent<Props> {
  static defaultProps: Partial<Props> = {
    size: 'xsmall',
    variant: 'square'
  }
  static displayName = 'Avatar'

  renderLogo() {
    const { classes, src, size } = this.props

    if (!src || size === 'small' || size === 'xsmall') {
      return null
    }

    return (
      <div className={classes.logoContainer}>
        <Logo emblem variant='white' className={classes.logo} />
      </div>
    )
  }

  renderInitials() {
    const { classes, src, name } = this.props

    if (src || !name) {
      return null
    }

    return (
      <Typography className={classes.text} invert>
        {getNameInitials(name)}
      </Typography>
    )
  }

  render() {
    const {
      alt,
      src,
      classes,
      className,
      name,
      size,
      style,
      variant,
      elementSelector
    } = this.props

    const sizeClassName = classes[size!]
    const variantClassName = classes[variant!]

    return (
      <div
        className={cx(classes.root, sizeClassName)}
        data-qa={elementSelector}
      >
        {src ? (
          <Image
            alt={alt || name}
            className={cx(
              classes.image,
              variantClassName,
              sizeClassName,
              classes.clippedCorner,
              className
            )}
            src={src}
            style={style}
          />
        ) : (
          <div
            className={cx(
              classes.textContainer,
              variantClassName,
              sizeClassName,
              classes.clippedCorner,
              className
            )}
          />
        )}
        {this.renderInitials()}
        {this.renderLogo()}
      </div>
    )
  }
}

export default withStyles(styles)(Avatar)
