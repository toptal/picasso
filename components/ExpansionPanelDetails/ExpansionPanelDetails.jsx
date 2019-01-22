import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import styles from './styles'

const ExpansionPanelDetails = props => {
  return <MUIExpansionPanelDetails {...props} />
}

export default withStyles(styles)(ExpansionPanelDetails)
