import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import { noop } from '@toptal/picasso-utils'

import { TableSortableCell } from '../TableSortableCell'
import type { Props } from './TableSortableCell'

const renderTableCell = (
  { children, sortDirection, onSortClick }: Props = {
    children: 'Cell',
    sortDirection: 'asc',
    onSortClick: noop,
  }
) => {
  return render(
    <table>
      <tbody>
        <tr>
          <TableSortableCell
            sortDirection={sortDirection}
            onSortClick={onSortClick}
          >
            {children}
          </TableSortableCell>
        </tr>
      </tbody>
    </table>
  )
}

describe('TableCell', () => {
  describe('sort direction is asc', () => {
    it('renders with a sort button in the right direction', () => {
      const { container, getByRole } = renderTableCell()
      const button = getByRole('button')

      expect(button).toContainHTML('PicassoSvgArrowLongUp16')
      expect(container).toMatchSnapshot()
    })
  })
  describe('sort direction is desc', () => {
    it('renders with a sort button in the right direction', () => {
      const { container, getByRole } = renderTableCell({
        sortDirection: 'desc',
      })
      const button = getByRole('button')

      expect(button).toContainHTML('PicassoSvgArrowLongDown16')
      expect(container).toMatchSnapshot()
    })
  })

  it('executes the callback when clicked', () => {
    const mockOnClick = jest.fn()

    const { getByRole } = renderTableCell({ onSortClick: mockOnClick })

    const button = getByRole('button')

    button.click()
    expect(mockOnClick).toHaveBeenCalled()
  })
})
