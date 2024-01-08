import { Table } from '@toptal/picasso'
import React from 'react'

const data = {
  noop: `A function that does nothing, a replacement for () => {}`,
  isBoolean: `Checks if the provided value is a boolean`,
  isNumber: `Checks if the provided value is a number`,
  isString: `Checks if the provided value is a string`,
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
