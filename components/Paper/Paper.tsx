import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIPaper from '@material-ui/core/Paper'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** Content of component */
  children: ReactNode
}

export const Paper: FunctionComponent<Props> = props => {
  const { classes, children } = props

  return (
    <MUIPaper classes={classes} elevation={1} square>
      {children}
    </MUIPaper>
  )
}

Paper.displayName = 'Paper'

export default withStyles(styles)(Paper)
