import type { HTMLAttributes, SVGProps } from 'react'
import React, { forwardRef } from 'react'
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
      <span ref={ref} className='flex'>
        <svg
          viewBox='3 3 11 11'
          className={twMerge(
            'fill-current',
            'ml-[0.7em]',
            size === 'small' ? 'min-w-[8px]' : 'min-w-[11px]',
            className
          )}
          style={style}
          {...(rest as SVGProps<SVGSVGElement>)}
        >
          <path d='m11.997 5.29.707.707-4 4-.707.707-.707-.707-4-4 .707-.707 4 4 4-4Z'></path>
        </svg>
      </span>
    )
  }
)

DropdownArrow.displayName = 'DropdownArrow'

DropdownArrow.defaultProps = {
  size: 'medium',
}

export default DropdownArrow
