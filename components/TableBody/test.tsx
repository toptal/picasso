import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Picasso from '../Picasso'
import Table from '../Table'

const renderTableBody = (props: any = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Table {...props}>
        <Table.Body {...props}>
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
