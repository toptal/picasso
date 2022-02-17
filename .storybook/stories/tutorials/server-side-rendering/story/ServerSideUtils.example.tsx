import { Table } from '@toptal/picasso'
import React from 'react'

const data = {
  getServersideStylesheets: `Creates a ServerStyleSheets object to render necessary styles on server side.`
}

const Example = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Description</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {Object.entries(data).map(([name, description]) => (
        <Table.Row key={name}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{description}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default Example
