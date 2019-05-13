import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {}

export const DropdownArrow: FunctionComponent<Props> = ({
  classes,
  className,
  style
}) => {
  return <span className={cx(classes.root, className)} style={style} />
}

DropdownArrow.displayName = 'DropdownArrow'

export default withStyles(styles)(DropdownArrow)
