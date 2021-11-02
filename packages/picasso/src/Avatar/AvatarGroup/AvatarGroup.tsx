import { BaseProps } from '@toptal/picasso-shared'
import React from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Container } from '../..'
import Avatar, { Props as AvatarProps } from '../Avatar'
import AvatarWrapper from '../AvatarWrapper/AvatarWrapper'
import TextAvatar from '../TextAvatar/TextAvatar'
import styles from './styles'

type ItemType = {
  alt?: AvatarProps['alt']
  'data-testid'?: string
  name?: AvatarProps['name']
  src?: AvatarProps['src']
}

export interface Props extends BaseProps {
  /** Array of people to render */
  items: ItemType[]
  /** Limit how many avatars can be rendered */
  limit?: number
  /** Size */
  size?: AvatarProps['size']
  /** Variant of the avatar shape */
  variant?: AvatarProps['variant']
}

const DEFAULTS = {
  limit: 5,
  size: 'xsmall',
  variant: 'square'
} as const

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAvatarGroup'
})

const AvatarGroup = ({
  className,
  style,
  'data-testid': dataTestId,
  items,
  limit,
  size,
  variant
}: Props) => {
  const classes = useStyles()

  if (items.length === 0) {
    return null
  }

  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const isOverLimit = items.length > limit!
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const itemsOverLimit = items.length - limit! + 1
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const avatarsToRender = isOverLimit ? items.slice(0, limit! - 1) : items

  return (
    <Container
      className={cx(classes.root, className)}
      data-testid={dataTestId}
      flex
      gap='xsmall'
      style={style}
    >
      {avatarsToRender.map(
        ({ alt, name, src, 'data-testid': avatarTestId }, index) => (
          <Avatar
            alt={alt}
            key={`${name}-${alt}-${String(index)}`}
            name={name}
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            size={size!}
            src={src}
            /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
            variant={variant!}
            data-testid={avatarTestId}
          />
        )
      )}
      {isOverLimit ? (
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        <AvatarWrapper size={size!}>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <TextAvatar variant={variant!} size={size!}>
            +{itemsOverLimit}
          </TextAvatar>
        </AvatarWrapper>
      ) : null}
    </Container>
  )
}

AvatarGroup.defaultProps = DEFAULTS

export default AvatarGroup
