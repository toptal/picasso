import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { Classes } from '../styles/types'
import { PageContext, PageContextProps } from '../Page'
import styles from './styles'

interface Props {
  classes: Classes
  /** Pass custom components that you want to render on the right side of the footer */
  rightContent?: React.ReactNode
}

const currentYear = new Date().getFullYear()

export const Footer: React.FunctionComponent<Props> = props => {
  const { classes, rightContent, ...rest } = props

  const { fullWidth } = useContext<PageContextProps>(PageContext)

  const contentClassnames = cx(
    {
      [classes.fullWidth]: fullWidth
    },
    classes.content
  )

  return (
    <footer className={classes.root} {...rest}>
      <div className={contentClassnames}>
        <div className={classes.left}>
          {`© Copyright 2010 – ${currentYear} Toptal, LLC`}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
}

export default withStyles(styles)(Footer)
