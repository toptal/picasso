import React, { FunctionComponent, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { CssBaselineProps } from '@material-ui/core/CssBaseline'

import styles from './styles'

const CssBaseline: FunctionComponent<CssBaselineProps> = ({ children }) => (
  <Fragment>{children}</Fragment>
)

export default withStyles(styles)(CssBaseline)
