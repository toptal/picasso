import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'

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
      <span ref={ref}>
        <ArrowDownMinor16
          {...rest}
          className={cx(classes.root, className)}
          style={{
            ...style,
            ...(size === 'small'
              ? { minHeight: '4px', minWidth: '8px', width: '11px' }
              : {}),
          }}
        />
      </span>
    )
  }
)

DropdownArrow.displayName = 'DropdownArrow'

DropdownArrow.defaultProps = {
  size: 'medium',
}

export default DropdownArrow
