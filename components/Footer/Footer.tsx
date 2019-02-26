import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  rightContent?: React.ReactNode
}

const currentYear = new Date().getFullYear()

const Footer: React.FunctionComponent<Props> = props => {
  const { classes, rightContent, ...rest } = props

  return (
    <footer className={classes.root} {...rest}>
      <div className={classes.content}>
        <div className={classes.left}>
          {`© Copyright 2010 – ${currentYear} Toptal, LLC`}
        </div>

        <div className={classes.right}>{rightContent}</div>
      </div>
    </footer>
  )
}

Footer.defaultProps = {}

export default withStyles(styles)(Footer)
