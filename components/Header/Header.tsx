import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Logo, Container, Typography } from '../'
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
    <header className={classes.root} {...rest}>
      <div className={classes.content}>
        <div className={classes.left}>
          <Container right={1}>
            <Logo variant='white' />
          </Container>
          <div className={classes.divider} />
          <Container left={1}>
            <Typography className={classes.title} weight='light'>
              {title}
            </Typography>
          </Container>
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </header>
  )
}

Header.defaultProps = {}

export default withStyles(styles)(Header)
