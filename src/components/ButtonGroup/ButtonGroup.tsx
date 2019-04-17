import React, { ReactNode, FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import Button from '../Button'
import { StandardProps } from '../Picasso'
import { withClasses } from '../styles'
import styles from './styles'

interface Props extends StandardProps {
  /** List of `Button` components which you want to render as `ButtonGroup` */
  children?: ReactNode
}

export const ButtonGroup: FunctionComponent<Props> = ({
  children,
  classes,
  className,
  style
}) => (
  <div className={cx(classes.root, className)} style={style}>
    {children}
  </div>
)

ButtonGroup.defaultProps = {
  children: null,
  classes: {}
}

ButtonGroup.displayName = 'ButtonGroup'

export default withStyles(styles)(
  withClasses(classes => [[Button, classes.button]])(ButtonGroup)
)
