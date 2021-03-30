import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'
import { TextLabelProps } from '@toptal/picasso-shared'

import Table, { TableProps } from '../Table'

jest.mock('ap-style-title-case')

type CellProps = Partial<TextLabelProps> & { children: React.ReactNode }

const DEFAULT_CELLS_PROPS: [CellProps, CellProps, CellProps] = [
  { children: 'Table test' },
  { children: 'Table test' },
  { children: 'Table test' }
]

const renderTable = (
  picassoConfig: PicassoConfig = { titleCase: false },
  cellsProps: [CellProps, CellProps, CellProps] = DEFAULT_CELLS_PROPS,
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
    const { container } = renderTable(undefined, undefined, {
      className: 'foo',
      spacing: 'compact',
      variant: 'bordered'
    })

    const table = container.querySelector('table')

    expect(table?.getAttribute('data-spacing')).toBe('compact')
    expect(table?.getAttribute('data-variant')).toBe('bordered')
    expect(table?.classList.contains('foo')).toBeTruthy()
  })

  describe('when Picasso titleCase property is true', () => {
    describe('when component does not override titleCase property', () => {
      beforeEach(() => {
        renderTable({ titleCase: true })
      })

      it('should transform table header text to title case', () => {
        expect(spiedOnTitleCase).toHaveBeenCalledTimes(1)
        expect(spiedOnTitleCase).toHaveBeenCalledWith(
          DEFAULT_CELLS_PROPS[0].children
        )
      })
    })

    describe('when component overrides titleCase property', () => {
      const cellsProps = DEFAULT_CELLS_PROPS.map(cellProps => ({
        ...cellProps,
        titleCase: false
      })) as typeof DEFAULT_CELLS_PROPS

      beforeEach(() => {
        renderTable({ titleCase: true }, cellsProps)
      })

      it('should not transform table header text to title case', () => {
        expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
      })
    })
  })
})
