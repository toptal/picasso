import React, { FunctionComponent, ReactNode } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps {
  /** List of `Label` components which you want to render inside `LabelGroup` */
  children: ReactNode
}

export const LabelGroup: FunctionComponent<Props> = ({ children, classes }) => (
  <div className={classes.root}>{children}</div>
)

LabelGroup.defaultProps = {
  children: undefined
}

LabelGroup.displayName = 'LabelGroup'

export default withStyles(styles)(LabelGroup)
