import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

import { JssProps } from '../Picasso'
import styles from './styles'

interface Props extends JssProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const ExpansionPanelDetails: FunctionComponent<Props> = ({
  classes,
  children,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUIExpansionPanelDetails {...rest} classes={classes}>
    {children}
  </MUIExpansionPanelDetails>
)

export default withStyles(styles)(ExpansionPanelDetails)
