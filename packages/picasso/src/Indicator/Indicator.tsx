import React, { forwardRef } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  CompoundedComponentWithRef,
  StandardProps
} from '@toptal/picasso-shared'

import styles from './styles'

type ColorType = 'red' | 'yellow' | 'blue' | 'green' | 'light-grey'

export interface Props extends StandardProps {
  /** Indicator color */
  color: ColorType
}

export const Indicator = forwardRef<HTMLDivElement, Props>(function Indicator(
  { classes, className, color, style, ...restProps },
  ref
) {
  return (
    <div
      role='img'
      {...restProps}
      className={cx(classes.root, className, classes[color])}
      style={style}
      ref={ref}
    />
  )
}) as CompoundedComponentWithRef<Props, HTMLDivElement>

Indicator.displayName = 'Indicator'

export default withStyles(styles)(Indicator)
