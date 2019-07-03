import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import { JssProps, ExtendElementProps } from '../Picasso'
import styles from './styles'

interface Props extends JssProps, ExtendElementProps {
  children?: ReactNode
}

const ExpansionPanelDetails: FunctionComponent<Props> = ({
  classes,
  children,
  elementSelector
}) => (
  <MUIExpansionPanelDetails classes={classes} data-qa={elementSelector}>
    {children}
  </MUIExpansionPanelDetails>
)

export default withStyles(styles)(ExpansionPanelDetails)
