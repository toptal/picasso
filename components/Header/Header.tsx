import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Logo, Container, Typography } from '../'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import styles from './styles'
import { Classes } from '../styles/types'

interface Props {
  classes: Classes
  /** Title which is displayed along the `Logo` */
  title: string
  /** Content for the right side of the `Header`  */
  rightContent?: React.ReactNode
}

export const Header: React.FunctionComponent<Props> = props => {
  const { classes, title, rightContent, ...rest } = props

  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <header className={classes.root} {...rest}>
      <div className={contentClassnames}>
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

Header.displayName = 'Header'

export default withStyles(styles)(Header)
