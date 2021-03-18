import React from 'react'
import { render, RenderResult, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'
import { TextLabelProps } from '@toptal/picasso-shared'

import Table from '../Table'

jest.mock('ap-style-title-case')

const renderTable = (
  picassoConfig: PicassoConfig = { titleCase: false },
  cellProps: Partial<TextLabelProps> = {},
  cellsContent: [string, string, string] = [
    'Table test',
    'Table test',
    'Table test'
  ]
) => {
  const { titleCase } = cellProps

  return render(
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell titleCase={titleCase}>{cellsContent[0]}</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell titleCase={titleCase}>{cellsContent[1]}</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell titleCase={titleCase}>{cellsContent[2]}</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance

describe('Table', () => {
  beforeEach(() => {
    spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
    api = renderTable()
  })

  afterEach(() => {
    spiedOnTitleCase.mockReset()
  })

  let api: RenderResult

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  it('should transform table header text to title case when Picasso titleCase property is true', () => {
    const HEADER_CELL_TEXT = 'Test sr2'

    renderTable({ titleCase: true }, {}, [HEADER_CELL_TEXT, 'a', 'b'])

    expect(spiedOnTitleCase).toHaveBeenCalledWith(HEADER_CELL_TEXT)
  })

  it('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderTable({ titleCase: true }, { titleCase: false })

    expect(spiedOnTitleCase).toHaveBeenCalledTimes(0)
  })
})
