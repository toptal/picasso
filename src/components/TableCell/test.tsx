import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Picasso from '../Picasso'
import Table from '../Table'

const renderTableCell = () => {
  return render(
    <Picasso loadFonts={false}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Cell test</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell test</Table.Cell>
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
    api = renderTableCell()
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
