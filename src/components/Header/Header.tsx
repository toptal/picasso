import React, { useContext, FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Logo, Container, Typography } from '../'
import { PageContext } from '../Page'
import { PageContextProps } from '../Page/types'
import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** Title which is displayed along the `Logo` */
  title: string
  /** Content for the right side of the `Header`  */
  rightContent?: ReactNode
}

export const Header: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  title,
  rightContent
}) => {
  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <header className={cx(classes.root, className)} style={style}>
      <div className={contentClassnames}>
        <div className={classes.left}>
          <Container mr={1} flex direction='row' alignItems='center'>
            <Logo variant='white' />
          </Container>
          <div className={classes.divider} />
          <Container ml={1}>
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
