import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUICssBaseline, { CssBaselineProps } from '@material-ui/core/CssBaseline'

import styles from './styles'

const CssBaseline: FunctionComponent<CssBaselineProps> = ({ children }) => (
  <MUICssBaseline>{children}</MUICssBaseline>
)

export default withStyles(styles)(CssBaseline)
