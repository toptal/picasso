import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useEffect, useState } from 'react'
import { Collapse } from '@toptal/picasso-collapse'
import { type BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'

const DEFAULT_COL_SPAN = 100

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Collapsible content of `TableExpandableRow` */
  content: ReactNode
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Number of columns the collapsible content spans */
  colSpan?: number
  /** Set a stripe even background for the row */
  stripeEven?: boolean
  /** Skips the opening transition for a row already expanded on first render */
  defaultExpanded?: boolean
}

export const TableExpandableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableExpandableRow(
    {
      expanded = false,
      stripeEven = false,
      defaultExpanded = false,
      colSpan = DEFAULT_COL_SPAN,
      ...props
    },
    ref
  ) {
    const { children, content, className, style, ...rest } = props

    // the row outlives `open` so it can animate closed; `open` flips one commit
    // after mounting so the height always has a zero to grow from
    const [mounted, setMounted] = useState(expanded)
    const [open, setOpen] = useState(expanded && defaultExpanded)

    useEffect(() => {
      if (!expanded) {
        setOpen(false)
      } else if (mounted) {
        setOpen(true)
      } else {
        setMounted(true)
      }
    }, [expanded, mounted])

    return (
      <>
        <TableRow
          {...rest}
          ref={ref}
          className={className}
          style={style}
          stripeEven={stripeEven}
        >
          {children}
        </TableRow>
        {mounted && (
          <TableRow
            className={twMerge(
              stripeEven && 'bg-gray-200/[0.32]',
              // no hairline under a zero-height row
              !open && 'border-b-0',
              className
            )}
            style={style}
          >
            <TableCell className='h-auto p-0' colSpan={colSpan}>
              <Collapse in={open} onExited={() => setMounted(false)}>
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
