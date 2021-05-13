import { Table } from '@toptal/picasso'
import React from 'react'

const data = {
  capitalize: `e.g. capitalize('a test string') === 'A test string'`,
  toTitleCase: `e.g. toTitleCase('a test string') === 'A Test String'`,
  kebabToCamelCase: `e.g. kebabToCamelCase('a-test-string') === 'aTestString'`,
  getNameInitials: `e.g. getNameInitials('John Doe') === 'JD'`,
  isSubstring: `e.g. isSubstring('test', 'a test string') === true`,
  generateRandomString: `e.g. 'qw8vd8'`,
  generateRandomStringOrGetEmptyInTest: ``
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
