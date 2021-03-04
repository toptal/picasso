import React from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Table from '../Table'

const renderTableCell = () => {
  return render(
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
  )
}

describe('TableCell', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTableCell()
  })

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  it('sets rowSpan', () => {
    const { getByTestId } = render(
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell data-testid='cell' rowSpan={10}>
              Cell test
            </Table.Cell>
          </Table.Row>
        </Table.Head>
      </Table>
    )

    expect(getByTestId('cell')).toHaveAttribute('rowspan', '10')
  })
})
