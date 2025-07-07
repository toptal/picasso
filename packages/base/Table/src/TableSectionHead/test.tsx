import React from 'react'
import type { RenderResult } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'

import { TableCompound as Table } from '../TableCompound'

const renderTableSectionHead = () => {
  return render(
    <Table>
      <Table.SectionHead className='bg-red-500'>Test</Table.SectionHead>
    </Table>
  )
}

describe('TableSectionHead', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableSectionHead()
  })

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
