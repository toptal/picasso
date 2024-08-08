import type { HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { BaseProps, SizeType } from '@toptal/picasso-shared'

export interface Props extends BaseProps, HTMLAttributes<HTMLSpanElement> {
  /** A Dropdown.Arrow can have different sizes */
  size?: SizeType<'small' | 'medium'>
}

export const DropdownArrow = forwardRef<HTMLSpanElement, Props>(
  function DropdownArrow(props, ref) {
    const { className, style, size = 'medium', ...rest } = props

    return (
      <span ref={ref}>
        <ArrowDownMinor16
          {...rest}
          className={twMerge('ml-[0.7em]', className)}
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
