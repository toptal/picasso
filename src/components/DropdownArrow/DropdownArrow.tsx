import React, { FunctionComponent, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLSpanElement> {}

export const DropdownArrow: FunctionComponent<Props> = ({
  classes,
  className,
  style,
  ...rest
}) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <span {...rest} className={cx(classes.root, className)} style={style} />
  )
}

DropdownArrow.displayName = 'DropdownArrow'

export default withStyles(styles)(DropdownArrow)
