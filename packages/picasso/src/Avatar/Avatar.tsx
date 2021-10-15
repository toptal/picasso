import React, { FunctionComponent, HTMLAttributes } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import styles from './styles'
import ImageAvatar from './ImageAvatar'
import InitialsAvatar from './InitialsAvatar'
import IconAvatar from './IconAvatar'

export type VariantType = 'square' | 'portrait' | 'landscape'
export type AvatarSizeType = SizeType<
  'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large'
>

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** Alt text */
  alt?: string
  /** User full name to display initials on the avatar */
  name?: string
  /**
   * Size
   * @default xsmall
   */
  size?: AvatarSizeType
  /** Photo url */
  src?: string
  /**
   * Variant of the avatar shape
   * @default square
   */
  variant?: VariantType
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoAvatar' })

export const Avatar: FunctionComponent<Props> = props => {
  const {
    alt,
    src,
    className,
    name,
    size = 'xsmall',
    style,
    variant = 'square',
    ...rest
  } = props

  const classes = useStyles(props)

  const renderAvatar = () => {
    if (src) {
      return (
        <ImageAvatar
          alt={alt}
          classes={classes}
          className={className}
          name={name}
          size={size}
          src={src}
          style={style}
          variant={variant}
        />
      )
    }

    if (name) {
      return (
        <InitialsAvatar
          classes={classes}
          className={className}
          name={name}
          size={size}
          variant={variant}
        />
      )
    }

    return (
      <IconAvatar
        classes={classes}
        className={className}
        size={size}
        variant={variant}
      />
    )
  }

  return (
    <div {...rest} className={cx(classes.root, classes[size])}>
      {renderAvatar()}
    </div>
  )
}

Avatar.defaultProps = {
  size: 'xsmall',
  variant: 'square'
}

Avatar.displayName = 'Avatar'

export default Avatar
