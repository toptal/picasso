import React, { forwardRef, HTMLAttributes } from 'react'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { StandardProps, SizeType } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends StandardProps, HTMLAttributes<HTMLSpanElement> {
  /** A Dropdown.Arrow can have different sizes */
  size?: SizeType<'small' | 'medium'>
}

export const DropdownArrow = forwardRef<HTMLSpanElement, Props>(
  function DropdownArrow({ classes, className, style, size, ...rest }, ref) {
    return (
      <span
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(classes.root, className, classes[size!])}
        style={style}
      />
    )
  }
)

DropdownArrow.displayName = 'DropdownArrow'

DropdownArrow.defaultProps = {
  size: 'medium'
}

export default withStyles(styles)(DropdownArrow)
