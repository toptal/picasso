import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import { TableSection, TableSectionContext } from '../Table'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** Zero or more Table.Row elements. */
  children: ReactNode
}

export const TableFooter = forwardRef<HTMLTableSectionElement, Props>(
  function TableFooter(props, ref) {
    const { className, style, children, ...rest } = props

    return (
      <TableSectionContext.Provider value={TableSection.FOOTER}>
        <tfoot
          {...rest}
          ref={ref}
          className={twMerge(
            'border-0 border-solid border-t border-gray-200',
            className
          )}
          style={style}
        >
          {children}
        </tfoot>
      </TableSectionContext.Provider>
    )
  }
)

TableFooter.defaultProps = {}

TableFooter.displayName = 'TableFooter'

export default TableFooter
