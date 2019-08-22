import React, { forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLSpanElement> {}

export const DropdownArrow = forwardRef<HTMLSpanElement, Props>(
  function DropdownArrow({ classes, className, style, ...rest }, ref) {
    return (
      <span
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className)}
        style={style}
      />
    )
  }
)

DropdownArrow.displayName = 'DropdownArrow'

export default withStyles(styles)(DropdownArrow)
