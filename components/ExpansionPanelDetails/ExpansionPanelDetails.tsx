import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import { JssProps } from '../Picasso'
import styles from './styles'

interface Props extends JssProps {
  children?: ReactNode
}

const ExpansionPanelDetails: FunctionComponent<Props> = ({
  classes,
  children
}) => (
  <MUIExpansionPanelDetails classes={classes}>
    {children}
  </MUIExpansionPanelDetails>
)

export default withStyles(styles)(ExpansionPanelDetails)
