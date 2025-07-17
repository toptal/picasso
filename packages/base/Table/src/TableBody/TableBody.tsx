import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef, useContext } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import { TableSectionContext, TableSection, TableContext } from '../Table'

export interface Props
  extends BaseProps,
    HTMLAttributes<HTMLTableSectionElement> {
  /** The content of the component, normally `Table.Row` */
  children: ReactNode
}

const stripeRows = (children: React.ReactNode) => {
  let stripeIndex = -1

  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    stripeIndex++
    if (stripeIndex % 2 !== 0) {
      return React.cloneElement(child, { stripeEven: true } as {})
    }

    return child
  })
}

export const TableBody = forwardRef<HTMLTableSectionElement, Props>(
  function TableBody(props, ref) {
    const { className, style, children, ...rest } = props
    const { variant } = useContext(TableContext)

    return (
      <TableSectionContext.Provider value={TableSection.BODY}>
        <tbody {...rest} ref={ref} className={className} style={style}>
          {variant === 'striped' ? stripeRows(children) : children}
        </tbody>
      </TableSectionContext.Provider>
    )
  }
)

TableBody.displayName = 'TableBody'

export default TableBody
