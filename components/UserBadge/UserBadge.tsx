import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '../Avatar'
import Typography from '../Typography'
import Grid from '../Grid'
import { SizeType } from '../Picasso'
import { Classes } from '../styles/types'
import styles from './styles'

type AlignmentType = boolean | 'auto'

interface Props {
  /** User full name to display */
  name: string
  /** Photo url or custom Avatar component */
  avatar?: ReactNode
  /** Size */
  size?: SizeType<'xsmall' | 'small'>
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
  classes: Classes
}

export const UserBadge: FunctionComponent<Props> = props => {
  const { avatar, name, size, invert, center, children } = props

  const UserBadgeAvatar = React.isValidElement(avatar) ? (
    avatar
  ) : (
    <Avatar name={name} size={size} src={avatar as string} />
  )

  // if 'auto' then center if children are null
  const shouldCenter = center === true || (center === 'auto' && !children)
  const alignItems = shouldCenter ? 'center' : 'flex-start'

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
  center: 'auto',
  invert: false,
  size: 'xsmall'
}

UserBadge.displayName = 'UserBadge'

export default withStyles(styles)(UserBadge)
