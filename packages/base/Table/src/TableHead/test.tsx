import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'

import { TableCompound as Table } from '../TableCompound'

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

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
