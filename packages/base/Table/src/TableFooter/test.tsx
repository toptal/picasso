import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'

import { TableCompound as Table } from '../TableCompound'

const renderTableFooter = () => {
  return render(
    <Table>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Footer test</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

describe('TableFooter', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableFooter()
  })

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
