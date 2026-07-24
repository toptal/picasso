import React from 'react'
import { Table } from '@toptal/picasso'

import { tableData as data } from '../support/table-data'

const AlignExample = () => (
  <div>
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Default</Table.Cell>
          <Table.Cell>Left</Table.Cell>
          <Table.Cell>Center</Table.Cell>
          <Table.Cell>Right</Table.Cell>
          <Table.Cell>Justify</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell align='left'>{row.talentType}</Table.Cell>
            <Table.Cell align='center'>{row.company}</Table.Cell>
            <Table.Cell align='right'>{row.role}</Table.Cell>
            <Table.Cell align='justify'>{row.country}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
)

const component = 'TableCell'

describe('TableCell', () => {
  it('row spans', () => {
    cy.mount(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell rowSpan={2}>Cell test</Table.Cell>
            <Table.Cell>Cell test</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell test</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'row-span',
    })
  })

  it('aligns cells', () => {
    cy.mount(<AlignExample />)
    cy.get('body').happoScreenshot({
      component,
      variant: 'align-cells',
    })
  })
})
