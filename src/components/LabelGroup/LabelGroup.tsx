import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  /** List of `Label` components which you want to render inside `LabelGroup` */
  children: ReactNode
}

export const LabelGroup: FunctionComponent<Props> = ({
  children,
  classes,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...rest} className={classes.root}>
    {children}
  </div>
)

LabelGroup.defaultProps = {
  children: undefined
}

LabelGroup.displayName = 'LabelGroup'

export default withStyles(styles)(LabelGroup)
