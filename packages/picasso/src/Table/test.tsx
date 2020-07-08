import React from 'react'
import { render, RenderResult, PicassoConfig } from '@toptal/picasso/test-utils'
import * as titleCaseModule from 'ap-style-title-case'

import Table from '../Table'

jest.mock('ap-style-title-case')

const renderTable = (
  picassoConfig?: PicassoConfig,
  cellProps: { titleCase?: boolean } = {}
) => {
  const { titleCase } = cellProps
  return render(
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell titleCase={titleCase}>Table test</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell titleCase={titleCase}>Table test</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell titleCase={titleCase}>Table test</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>,
    undefined,
    picassoConfig
  )
}

let spiedOnTitleCase: jest.SpyInstance
beforeEach(() => {
  spiedOnTitleCase = jest.spyOn(titleCaseModule, 'default')
})
afterEach(() => {
  spiedOnTitleCase.mockReset()
})

describe('Table', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTable(undefined)
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('should transform table header text to title case when Picasso titleCase property is true', () => {
    renderTable({ titleCase: true })

    expect(spiedOnTitleCase).toBeCalledTimes(1)
  })

  test('should not transform text to title case when Picasso titleCase property is true but the component property overrides it', () => {
    renderTable({ titleCase: true }, { titleCase: false })

    expect(spiedOnTitleCase).toBeCalledTimes(0)
  })
})
