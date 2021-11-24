import { Table } from '@toptal/picasso'
import React from 'react'

const data = [
  [
    `createStylesHook`,
    `A function that abstracts 'makeStyles' from @material-ui/core`,
    '@toptal/picasso'
  ]
]

const Example = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Description</Table.Cell>
        <Table.Cell>Location</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map(([name, description, location]) => (
        <Table.Row key={name}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{description}</Table.Cell>
          <Table.Cell>{location}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default Example
