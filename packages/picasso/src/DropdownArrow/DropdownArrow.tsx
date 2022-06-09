import React, { forwardRef, HTMLAttributes } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import { BaseProps, SizeType } from '@toptal/picasso-shared'

import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLSpanElement> {
  /** A Dropdown.Arrow can have different sizes */
  size?: SizeType<'small' | 'medium'>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoDropdownArrow',
})

export const DropdownArrow = forwardRef<HTMLSpanElement, Props>(
  function DropdownArrow(props, ref) {
    const { className, style, size = 'medium', ...rest } = props

    const classes = useStyles()

    return (
      <span
        {...rest}
        ref={ref}
        className={cx(classes.root, className, classes[size])}
        style={style}
      />
    )
  }
)

DropdownArrow.displayName = 'DropdownArrow'

DropdownArrow.defaultProps = {
  size: 'medium',
}

export default DropdownArrow
