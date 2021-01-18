import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

const renderTableSectionHead = () => {
  return render(
    <Table>
      <Table.SectionHead>Test</Table.SectionHead>
    </Table>
  )
}

describe('TableSectionHead', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableSectionHead()
  })

  it('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
