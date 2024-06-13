import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TableSectionContext, TableSection } from '../Table'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

export const TableHead = forwardRef<HTMLTableSectionElement, Props>(
  function TableHead(props, ref) {
    const { className, style, children, ...rest } = props

    return (
      <TableSectionContext.Provider value={TableSection.HEAD}>
        <thead
          {...rest}
          ref={ref}
          className={twMerge(
            'border-0 border-solid border-b border-gray-200',
            className
          )}
          style={style}
        >
          {children}
        </thead>
      </TableSectionContext.Provider>
    )
  }
)

TableHead.defaultProps = {}

TableHead.displayName = 'TableHead'

export default TableHead
