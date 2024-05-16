import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useRef, useEffect } from 'react'
import { Collapse } from '@toptal/picasso-collapse'
import { type BaseProps } from '@toptal/picasso-shared'
import { twJoin } from 'tailwind-merge'

import { TableRow } from '../TableRow'
import { TableCell } from '../TableCell'

const MAX_COL_SPAN = 100

export interface Props extends BaseProps, HTMLAttributes<HTMLTableRowElement> {
  /** Should be valid `<tr>` children such as `Table.Cell`. */
  children: ReactNode
  /** Collapsible content of `TableExpandableRow` */
  content: React.ReactElement
  /** Whether the row is in collapsed or expanded state */
  expanded?: boolean
  /** Set a stripe even background for the row */
  stripeEven?: boolean
  /** Makes the row appear without transition when it is expanded the very first time */
  defaultExpanded?: boolean
}

export const TableExpandableRow = forwardRef<HTMLTableRowElement, Props>(
  function TableExpandableRow(props, ref) {
    const {
      children,
      content,
      expanded,
      defaultExpanded,
      stripeEven,
      className,
      style,
      ...rest
    } = props

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
            className={twJoin(className, stripeEven && 'bg-gray-100')}
            style={style}
          >
            <TableCell
              className={twJoin(
                'p-0 last:pr-0',
                stripeEven && 'bg-[rgba(235,236,237,0.32)]'
              )}
              colSpan={MAX_COL_SPAN}
            >
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

TableExpandableRow.defaultProps = {
  expanded: false,
  stripeEven: false,
}

TableExpandableRow.displayName = 'TableExpandableRow'

export default TableExpandableRow
