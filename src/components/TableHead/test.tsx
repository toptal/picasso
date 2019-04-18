import React from 'react'
import { render, cleanup, RenderResult } from 'react-testing-library'

import Picasso from '../Picasso'
import Table from '../Table'

const renderTableHead = (props: any = {}) => {
  return render(
    <Picasso loadFonts={false}>
      <Table>
        <Table.Head {...props}>
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
