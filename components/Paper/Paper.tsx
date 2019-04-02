import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIPaper from '@material-ui/core/Paper'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
  /** Shadow depth */
  elevation?: 1 | 2 | 3 | 4
  /** Content of component */
  children: ReactNode
}

export const Paper: FunctionComponent<Props> = props => {
  const { classes, elevation, children } = props

  return (
    <MUIPaper classes={classes} elevation={elevation} square>
      {children}
    </MUIPaper>
  )
}

Paper.defaultProps = {
  elevation: 2
}

Paper.displayName = 'Paper'

export default withStyles(styles)(Paper)
