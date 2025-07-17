import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useRef, useEffect } from 'react'
import { Collapse } from '@toptal/picasso-collapse'
import { type BaseProps } from '@toptal/picasso-shared'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'

const MAX_COL_SPAN = 100

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Collapsible content of `TableExpandableRow` */
  content: ReactNode
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Set a stripe even background for the row */
  stripeEven?: boolean
  /** Makes the row appear without transition when it is expanded the very first time */
  defaultExpanded?: boolean
}

export const TableExpandableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableExpandableRow(
    { expanded = false, stripeEven = false, ...props },
    ref
  ) {
    const { children, content, defaultExpanded, className, style, ...rest } =
      props

    const wasExpandedOnce = useRef(false)
    const shouldTransition = !defaultExpanded || wasExpandedOnce.current

    useEffect(() => {
      if (!wasExpandedOnce.current && expanded) {
        wasExpandedOnce.current = true
      }
    }, [expanded])

    const row = (
      <TableRow
        {...rest}
        ref={ref}
        className={className}
        style={style}
        stripeEven={stripeEven}
      >
        {children}
      </TableRow>
    )

    return (
      <>
        {row}
        {expanded && (
          <TableRow
            className={twJoin(
              className,
              stripeEven && 'bg-gray-200 bg-opacity-[32]'
            )}
            style={style}
          >
            <TableCell className='p-0 last:pr-0' colSpan={MAX_COL_SPAN}>
              <Collapse appear={shouldTransition} in>
                {content}
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    )
  }
)

TableExpandableRow.displayName = 'TableExpandableRow'

export default TableExpandableRow
