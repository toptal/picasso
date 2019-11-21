import React, { forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

type ColorType = 'red' | 'yellow' | 'blue'

export interface Props extends StandardProps {
  /** Indicator color */
  color: ColorType
}

export const Indicator = forwardRef<HTMLElement, Props>(function Indicator({
  classes,
  className,
  color,
  style
}) {
  return (
    <div
      className={cx(classes.root, className, classes[color])}
      style={style}
    />
  )
})

Indicator.displayName = 'Indicator'

export default withStyles(styles)(Indicator)
