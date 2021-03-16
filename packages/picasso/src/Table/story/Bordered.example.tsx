import React from 'react'
import { Table } from '@toptal/picasso'
import { tableMockData } from '@toptal/picasso/test-utils'

const Example = () => (
  <Table bordered striped={false}>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Talent type</Table.Cell>
        <Table.Cell>Company</Table.Cell>
        <Table.Cell>Role</Table.Cell>
        <Table.Cell>Country</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {tableMockData.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>{row.talentType}</Table.Cell>
          <Table.Cell>{row.company}</Table.Cell>
          <Table.Cell>{row.role}</Table.Cell>
          <Table.Cell>{row.country}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={3}>Total</Table.Cell>
        <Table.Cell>Role</Table.Cell>
        <Table.Cell>Country</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default Example
