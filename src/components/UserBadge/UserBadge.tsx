import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Avatar from '../Avatar'
import Container from '../Container'
import Typography from '../Typography'
import { StandardProps, SizeType } from '../Picasso'
import styles from './styles'

type AlignmentType = boolean | 'auto'

export interface Props extends StandardProps {
  /** User full name to display */
  name: string
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Size */
  size?: SizeType<'xsmall' | 'small'>
  /** Title that is rendered on the right of name */
  title?: string
  /** Invert color */
  invert?: boolean
  /**
   * Center text vertically
   *
   * * auto - if no children is provided text will be centered
   * * manual - based on `center` prop `boolean` value
   */
  center?: AlignmentType
  /** Additional content of UserBadge */
  children?: ReactNode
}

export const UserBadge: FunctionComponent<Props> = ({
  avatar,
  name,
  size,
  title,
  invert,
  center,
  children,
  classes,
  className,
  style
}) => {
  const UserBadgeAvatar = React.isValidElement(avatar) ? (
    avatar
  ) : (
    <Avatar name={name} size={size} src={avatar as string} />
  )

  // if 'auto' then center if children are null
  const shouldCenter = center === true || (center === 'auto' && !children)
  const alignItems = shouldCenter ? 'center' : 'flex-start'

  const { title: titleClass } = classes
  const userTitle = title && (
    <Typography inline className={titleClass}>
      {title}
    </Typography>
  )

  return (
    <Container
      flex
      alignItems={alignItems}
      className={cx(classes.root, className)}
      style={style}
    >
      {UserBadgeAvatar}
      <Container flex direction='column' left='small'>
        <Container>
          <Typography inline variant='heading' size='small' invert={invert}>
            {name}
          </Typography>
          <Typography inline invert={invert} size='medium'>
            {userTitle}
          </Typography>
        </Container>
        {children && <Container>{children}</Container>}
      </Container>
    </Container>
  )
}

UserBadge.defaultProps = {
  center: 'auto',
  invert: false,
  size: 'xsmall'
}

UserBadge.displayName = 'UserBadge'

export default withStyles(styles)(UserBadge)
