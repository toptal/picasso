import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '../Avatar'
import Container from '../Container'
import Typography from '../Typography'
import Grid from '../Grid'
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

  const { title: titleClass, ...gridClasses } = classes
  const userTitle = title && (
    <Typography inline className={titleClass} variant='h5'>
      {title}
    </Typography>
  )

  return (
    <Grid
      spacing={16}
      alignItems={alignItems}
      classes={gridClasses}
      className={className}
      style={style}
    >
      <Grid.Item>{UserBadgeAvatar}</Grid.Item>
      <Grid.Item>
        <Typography inline variant='h5' invert={invert} weight='semibold'>
          {name}
        </Typography>
        {userTitle}
        {children && <Container top={0.25}>{children}</Container>}
      </Grid.Item>
    </Grid>
  )
}

UserBadge.defaultProps = {
  center: 'auto',
  invert: false,
  size: 'xsmall'
}

UserBadge.displayName = 'UserBadge'

export default withStyles(styles)(UserBadge)
