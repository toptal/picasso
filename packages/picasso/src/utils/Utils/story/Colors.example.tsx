import { Table } from '@toptal/picasso'
import React from 'react'

const Example = () => {
  const data = {
    'colorUtils.alpha': `Sets the alpha channel for the color and returns the hex color format`,
    'colorUtils.lighten': `Sets the lightness of the color and returns the hex color format`,
    'colorUtils.darken': `Sets the darkness of the color and returns the hex color format`
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Description</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Object.entries(data).map(([name, description], index) => (
          <Table.Row key={index}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default Example
