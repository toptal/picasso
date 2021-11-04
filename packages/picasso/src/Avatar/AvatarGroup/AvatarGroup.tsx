import { BaseProps } from '@toptal/picasso-shared'
import React, { useMemo } from 'react'
import cx from 'classnames'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Container } from '../..'
import Avatar, { AvatarSizeType } from '../Avatar'
import AvatarWrapper from '../AvatarWrapper/AvatarWrapper'
import TextAvatar from '../TextAvatar/TextAvatar'
import styles from './styles'

type ItemType = {
  alt?: string
  'data-testid'?: string
  name?: string
  src?: string
}

export interface Props extends Omit<BaseProps, 'data-testid'> {
  /** Array of people to render */
  items: ItemType[]
  /** Limit how many avatars can be rendered */
  limit?: number
  /** Size */
  size?: AvatarSizeType
  /** data-testid to all parts of component */
  testIds?: {
    container?: string
    overLimit?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAvatarGroup'
})

const AvatarGroup = ({
  className,
  style,
  testIds,
  items,
  limit,
  size
}: Props) => {
  const classes = useStyles()

  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const isOverLimit = items.length > limit!
  // we need to add +1 for the last item that is going to be transformed to numbered Avatar
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const itemsOverLimit = items.length - limit! + 1
  const avatarsToRender = useMemo(
    () =>
      /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
      isOverLimit ? items.slice(0, limit! - 1) : items,
    [isOverLimit, items, limit]
  )

  if (items.length === 0) {
    return null
  }

  return (
    <Container
      className={cx(classes.root, className)}
      data-testid={testIds?.container}
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
            data-testid={avatarTestId}
          />
        )
      )}
      {isOverLimit ? (
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        <AvatarWrapper size={size!} variant='square'>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <TextAvatar data-testid={testIds?.overLimit} size={size!}>
            +{itemsOverLimit}
          </TextAvatar>
        </AvatarWrapper>
      ) : null}
    </Container>
  )
}

AvatarGroup.defaultProps = {
  limit: 5,
  size: 'xsmall'
}

export default AvatarGroup
