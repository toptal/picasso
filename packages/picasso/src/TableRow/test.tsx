import React from 'react'
import { render } from '@toptal/picasso/test-utils'

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
  it('renders', () => {
    const { container } = renderTableRow()

    expect(container).toMatchSnapshot()
  })
})
