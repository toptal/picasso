import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CssBaselineProps } from '@material-ui/core/CssBaseline'

import styles from './styles'

const CssBaseline: FunctionComponent<CssBaselineProps> = ({ children }) => (
  <>{children}</>
)

export default withStyles(styles)(CssBaseline)
