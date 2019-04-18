import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Picasso from '../Picasso'
import Table from '../Table'

const renderTable = (props: any = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Table {...props}>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Table test</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Table test</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Table', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTable()
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
