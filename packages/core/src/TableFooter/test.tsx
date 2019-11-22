import React from 'react'
import { cleanup, render, RenderResult } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Table from '../Table'

const renderTableFooter = () => {
  return render(
    <Picasso loadFonts={false}>
      <Table>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Footer test</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Picasso>
  )
}

afterEach(cleanup)

describe('TableFooter', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableFooter()
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
