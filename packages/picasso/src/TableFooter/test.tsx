import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

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

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
