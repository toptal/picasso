import type { ReactElement, HTMLAttributes, FunctionComponent } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import { TableSection, TableSectionContext } from '../Table'
import { TableCell } from '../TableCell'
import { TableRow } from '../TableRow'
import { TableBody } from '../TableBody'

const MAX_COL_SPAN = 100

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  colSpan?: number
  icon?: ReactElement
}

export const TableSectionHead: FunctionComponent<Props> = forwardRef<
  HTMLTableSectionElement,
  Props
>(function TableSectionHead(props, ref) {
  const { colSpan, icon, children, style } = props

  return (
    <TableBody ref={ref}>
      <TableRow
        className='min-h-10 border-y border-solid border-gray-200'
        style={style}
      >
        <TableSectionContext.Provider value={TableSection.HEAD}>
          <TableCell colSpan={colSpan}>
            {icon && (
              <span className='inline-block align-middle mr-3 -mt-[1px]'>
                {icon}
              </span>
            )}
            {children}
          </TableCell>
        </TableSectionContext.Provider>
      </TableRow>
    </TableBody>
  )
})

TableSectionHead.defaultProps = {
  colSpan: MAX_COL_SPAN,
}

TableSectionHead.displayName = 'TableSectionHead'

export default TableSectionHead
