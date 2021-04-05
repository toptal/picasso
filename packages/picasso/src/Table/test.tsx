import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'

import Table, { TableProps } from '../Table'
import TableContext from './TableContext'
import { TableCellProps } from '../TableCell'

jest.mock('ap-style-title-case')

const DEFAULT_CELLS_PROPS: [TableCellProps, TableCellProps, TableCellProps] = [
  { children: 'Table test' },
  { children: 'Table test' },
  { children: 'Table test' }
]

const renderTable = (
  picassoConfig: PicassoConfig = { titleCase: false },
  cellsProps: [
    TableCellProps,
    TableCellProps,
    TableCellProps
  ] = DEFAULT_CELLS_PROPS,
  tableProps: Pick<
    TableProps,
    'className' | 'style' | 'spacing' | 'variant'
  > = {}
) => {
  return render(
    <Table {...tableProps}>
      <Table.Head>
        <Table.Row>
          <Table.Cell titleCase={cellsProps[0].titleCase}>
            {cellsProps[0].children}
          </Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell titleCase={cellsProps[1].titleCase}>
            {cellsProps[1].children}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell titleCase={cellsProps[2].titleCase}>
            {cellsProps[2].children}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>,
    undefined,
    picassoConfig
  )
}

const spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')

describe('Table', () => {
  beforeEach(() => {
    spiedOnTitleCase.mockReset()
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  it('renders', () => {
    const { container } = renderTable()

    expect(container).toMatchSnapshot()
  })

  it('sets attributes correctly', () => {
    const { getByTestId } = render(
      <Table
        data-testid='table'
        className='foo'
        spacing='compact'
        variant='bordered'
      >
        <TableContext.Consumer>
          {({ variant, spacing }) => (
            <Table.Body>
              <Table.Row>
                <Table.Cell data-testid='variant'>{variant}</Table.Cell>
                <Table.Cell data-testid='spacing'>{spacing}</Table.Cell>
              </Table.Row>
            </Table.Body>
          )}
        </TableContext.Consumer>
      </Table>
    )

    const table = getByTestId('table')

    expect(getByTestId('spacing').textContent).toBe('compact')
    expect(getByTestId('variant').textContent).toBe('bordered')
    expect(table?.classList.contains('foo')).toBeTruthy()
  })

  describe('when Picasso titleCase property is true', () => {
    describe('when component does not override titleCase property', () => {
      it('should transform table header text to title case', () => {
        renderTable({ titleCase: true })

        expect(spiedOnTitleCase).toHaveBeenCalledTimes(1)
        expect(spiedOnTitleCase).toHaveBeenCalledWith(
          DEFAULT_CELLS_PROPS[0].children
        )
      })
    })

    describe('when component overrides titleCase property', () => {
      it('should not transform table header text to title case', () => {
        const cellsProps = DEFAULT_CELLS_PROPS.map(cellProps => ({
          ...cellProps,
          titleCase: false
        })) as typeof DEFAULT_CELLS_PROPS

        renderTable({ titleCase: true }, cellsProps)

        expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
      })
    })
  })
})
