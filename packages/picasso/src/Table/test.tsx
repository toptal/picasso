import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test_utils'

import Table from '../Table'

const renderTable = () => {
  return render(
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Table test</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Table test</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Table test</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

describe('Table', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTable()
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
