import { Table } from '@toptal/picasso'
import React from 'react'

const data = {
  forwardRef: `Wrapper around React.forwardRef that preserves genericity of the passed component`,
  useSafeState: `Wrapper around React.useState that ignores state updates when the component is unmounted`,
  useCombinedRefs: `Combines multiple refs into one`,
  useWidthOf: `Calculates width of an element`,
  disableUnsupportedProps: `Removes props that are not supported for passed props values`,
  ClickAwayListener: `Listen for click events that occur somewhere in the document, outside of the element itself`
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
