import React from 'react'
import { ButtonCircular } from '@toptal/picasso-button'
import { ArrowLongUp16, ArrowLongDown16 } from '@toptal/picasso-icons'

import type { TableCellProps } from '../TableCell'
import { TableCell } from '../TableCell'

export type Props = {
  /** Set the direction of sorting to get the appropriate icon */
  sortDirection: 'asc' | 'desc'
  /** Callback called when sort button is clicked */
  onSortClick: () => void
} & Exclude<TableCellProps, 'adornment'>

export const TableSortableCell = ({
  sortDirection,
  onSortClick,
  ...rest
}: Props) => {
  const Icon = sortDirection === 'desc' ? ArrowLongDown16 : ArrowLongUp16

  return (
    <TableCell
      className='group hover:bg-gray-100'
      adornment={
        <ButtonCircular
          variant='flat'
          icon={<Icon />}
          onClick={onSortClick}
          className='ml-2 invisible group-hover:visible'
        />
      }
      {...rest}
    />
  )
}

TableSortableCell.defaultProps = {
  align: 'inherit',
}

TableSortableCell.displayName = 'TableSortableCell'

export default TableSortableCell
