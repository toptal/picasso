import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIAccordionDetails from '@material-ui/core/AccordionDetails'
import { JssProps } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends JssProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const AccordionDetails: FunctionComponent<Props> = ({
  classes,
  children,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MUIAccordionDetails {...rest} classes={classes}>
    {children}
  </MUIAccordionDetails>
)

export default withStyles(styles)(AccordionDetails)
