import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Table from '../Table'

const renderTableHead = () => {
  return render(
    <Picasso loadFonts={false}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Head test</Table.Cell>
          </Table.Row>
        </Table.Head>
      </Table>
    </Picasso>
  )
}

afterEach(cleanup)

describe('TableHead', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableHead()
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
