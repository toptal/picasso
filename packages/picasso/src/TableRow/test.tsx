import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

const renderTableRow = () => {
  return render(
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Row test</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

describe('TableRow', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableRow()
  })

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
