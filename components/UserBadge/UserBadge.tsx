import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '../Avatar'
import Typography from '../Typography'
import Grid from '../Grid'
import { Classes } from '../styles/types'
import styles from './styles'

type SizeType = 'xsmall' | 'small'

interface Props {
  /** User full name to display */
  name: string
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Size */
  size?: SizeType
  /** Invert color */
  invert?: boolean
  /** Center text vertically */
  center?: boolean
  /** Additional content of UserBadge */
  children?: ReactNode
  classes: Classes
}

export const UserBadge: FunctionComponent<Props> = props => {
  const { avatar, name, size, invert, center, children } = props

  const UserBadgeAvatar = React.isValidElement(avatar) ? (
    avatar
  ) : (
    <Avatar name={name} size={size} src={avatar as string} />
  )

  const alignItems = center ? 'center' : 'flex-start'

  return (
    <Grid spacing={16} alignItems={alignItems}>
      <Grid.Item>{UserBadgeAvatar}</Grid.Item>
      <Grid.Item>
        <Typography invert={invert} weight='semibold'>
          {name}
        </Typography>
        {children}
      </Grid.Item>
    </Grid>
  )
}

UserBadge.defaultProps = {
  center: false,
  invert: false,
  size: 'xsmall'
}

UserBadge.displayName = 'UserBadge'

export default withStyles(styles)(UserBadge)
