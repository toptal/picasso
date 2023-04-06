import React from 'react'
import type { RenderResult } from '@toptal/picasso/test-utils'
import { render } from '@toptal/picasso/test-utils'

import { TableCompound as Table } from '../TableCompound'

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

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
