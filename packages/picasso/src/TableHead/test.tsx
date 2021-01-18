import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

const renderTableHead = () => {
  return render(
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Head test</Table.Cell>
        </Table.Row>
      </Table.Head>
    </Table>
  )
}

describe('TableHead', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableHead()
  })

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
