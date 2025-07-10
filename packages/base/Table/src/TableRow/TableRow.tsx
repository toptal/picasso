import type { ReactNode, MouseEvent, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TableContext } from '../Table'

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** If true, the table row will shade on hover */
  hover?: boolean
  /** If true, the table row will have the selected shading */
  selected?: boolean
  /** Callback invoked when user clicks on table row */
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void
  /** Set a stripe even background for the row */
  stripeEven?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableRow(props, ref) {
    const {
      className,
      style,
      children,
      hover = false,
      selected = false,
      stripeEven = false,
      onClick,
      ...rest
    } = props

    const { variant } = useContext(TableContext)
    const isBordered = variant === 'bordered' || variant === 'striped'

    return (
      <tr
        {...rest}
        ref={ref}
        className={twMerge(
          isBordered && 'border-0 border-solid border-b border-gray-200',
          stripeEven && 'bg-gray-100',
          hover && 'hover:bg-blue-100 transition-colors',
          selected && 'bg-blue-100',
          className
        )}
        style={style}
        onClick={onClick}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

export default TableRow
