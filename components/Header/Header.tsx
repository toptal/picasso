import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Logo, Spacer, Typography } from '../'
import styles from './styles'
import { Classes } from '../styles/types'

interface Props {
  classes: Classes
  title: string
  rightContent?: React.ReactNode
}

const Header: React.FunctionComponent<Props> = props => {
  const { classes, title, rightContent, ...rest } = props

  return (
    <div className={classes.root} {...rest}>
      <div className={classes.left}>
        <Logo variant='white' />
        <Spacer right={1} />
        <div className={classes.divider} />
        <Spacer right={1} />
        <Typography className={classes.title} weight='light'>
          {title}
        </Typography>
      </div>

      <div className={classes.right}>{rightContent}</div>
    </div>
  )
}

Header.defaultProps = {}

export default withStyles(styles)(Header)
