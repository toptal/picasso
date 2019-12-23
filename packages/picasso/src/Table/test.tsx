import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

import Table from '../Table'

const renderTable = () => {
  return render(
    <Picasso loadFonts={false}>
      <Table>
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
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Table test</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Picasso>
  )
}

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
