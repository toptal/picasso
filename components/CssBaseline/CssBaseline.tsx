import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUICssBaseline from '@material-ui/core/CssBaseline'

import { Classes } from '../styles/types'
import styles from './styles'

interface Props {
  classes: Classes
}

const CssBaseline: React.FunctionComponent<Props> = props => {
  const { children } = props

  return <MUICssBaseline>{children as React.ReactElement}</MUICssBaseline>
}

export default withStyles(styles)(CssBaseline)
