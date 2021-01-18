import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

const renderTableBody = () => {
  return render(
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Body test</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

describe('TableCell', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableBody()
  })

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
