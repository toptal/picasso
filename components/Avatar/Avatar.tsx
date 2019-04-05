import React, { CSSProperties } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Image from '../Image'
import Logo from '../Logo'
import Typography from '../Typography'
import getNameInitials from '../utils/getNameInitials'
import { Classes } from '../styles/types'
import styles from './styles'

type SizeType = 'xsmall' | 'small' | 'medium' | 'large'

type VariantType = 'square' | 'portrait' | 'landscape'

interface Props {
  /** Alt text */
  alt?: string
  classes: Classes
  className?: string
  /** User full name to display initials on the avatar */
  name: string
  /** Size */
  size?: SizeType
  /** Photo url */
  src?: string
  style?: CSSProperties
  /** Variant of the avatar shape */
  variant?: VariantType
}

export class Avatar extends React.PureComponent<Props> {
  static defaultProps = {
    size: 'xsmall' as SizeType,
    variant: 'square' as VariantType
  }
  static displayName = 'Avatar'

  renderLogo() {
    const { classes, src, size } = this.props

    if (!src || size === 'small' || size === 'xsmall') {
      return null
    }

    return <Logo emblem variant='white' className={classes.logo} />
  }

  renderInitials() {
    const { classes, src, name } = this.props

    if (src || !name) {
      return null
    }

    return (
      <Typography className={classes.text}>{getNameInitials(name)}</Typography>
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
      variant
    } = this.props

    const sizeClassName = classes[size!]
    const variantClassName = classes[variant!]

    return (
      <div className={cx(classes.root, sizeClassName)}>
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
