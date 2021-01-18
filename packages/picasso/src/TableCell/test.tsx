import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

const renderTableCell = () => {
  return render(
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Cell test</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell test</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

describe('TableCell', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableCell()
  })

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
