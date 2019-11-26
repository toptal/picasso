import React from 'react'
import { render, cleanup, RenderResult } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Table from '../Table'

const renderTableBody = () => {
  return render(
    <Picasso loadFonts={false}>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Body test</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Picasso>
  )
}

afterEach(cleanup)

describe('TableCell', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableBody()
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
