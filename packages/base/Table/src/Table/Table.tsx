import type { ReactNode, TableHTMLAttributes } from 'react'
import React, { forwardRef, useMemo } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from 'tailwind-merge'

import TableContext from './TableContext'

export interface Props
  extends BaseProps,
    TableHTMLAttributes<HTMLTableElement> {
  /** Children components (`Table.Head`, `Table.Body`, `Table.Footer`) */
  children: ReactNode
  /** Inner spacing */
  spacing?: 'compact' | 'narrow' | 'regular'
  /** Appearance variant */
  variant?: 'clear' | 'bordered' | 'striped'
}

// eslint-disable-next-line react/display-name
export const Table = forwardRef<HTMLTableElement, Props>(function Table(
  props,
  ref
) {
  const {
    className,
    style,
    children,
    spacing = 'regular',
    variant = 'bordered',
    ...rest
  } = props

  const tableConfig = useMemo(() => ({ spacing, variant }), [spacing, variant])

  return (
    <TableContext.Provider value={tableConfig}>
      <table
        {...rest}
        ref={ref}
        className={twMerge(
          'w-full border-collapse border-spacing-0',
          className
        )}
        style={style}
      >
        {children}
      </table>
    </TableContext.Provider>
  )
})

Table.defaultProps = {
  spacing: 'regular',
  variant: 'bordered',
}

Table.displayName = 'Table'

export default Table
