import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Table, { TableConfig, TableContext } from '../Table'
import { Props } from './TableCell'

const renderTableCell = (
  { children = 'Cell', ...rest }: Partial<Props> = {},
  tableConfig: TableConfig = {}
) => {
  return render(
    <TableContext.Provider value={tableConfig}>
      <Table.Cell {...rest}>{children}</Table.Cell>
    </TableContext.Provider>
  )
}

describe('TableCell', () => {
  it('renders', () => {
    const { container } = renderTableCell()

    expect(container).toMatchSnapshot()
  })

  it('renders compact', () => {
    const { container } = renderTableCell({}, { variant: 'compact' })

    expect(container).toMatchSnapshot()
  })

  it('renders narrow', () => {
    const { container } = renderTableCell({}, { variant: 'narrow' })

    expect(container).toMatchSnapshot()
  })

  it('sets attribuites correctly', () => {
    const { getByTestId } = renderTableCell({
      'data-testid': 'cell',
      rowSpan: 10,
      colSpan: 2,
      style: { background: 'red' }
    })

    const cell = getByTestId('cell')

    expect(cell).toHaveAttribute('rowspan', '10')
    expect(cell).toHaveAttribute('colspan', '2')
    expect(cell).toHaveAttribute('style', 'background: red;')
  })

  it('capitalizes in head if titleCase is truthy', () => {
    const { getByTestId } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell data-testid='head-cell'>head</Table.Cell>
          </Table.Row>
        </Table.Head>
      </Table>,
      undefined,
      { titleCase: true }
    )

    expect(getByTestId('head-cell')).toHaveTextContent('Head')
  })

  it('does not capitalize in head if titleCase is falsy', () => {
    const { getByTestId } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell data-testid='head-cell'>head</Table.Cell>
          </Table.Row>
        </Table.Head>
      </Table>
    )

    expect(getByTestId('head-cell')).toHaveTextContent('head')
  })
})
