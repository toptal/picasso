import React from 'react'
import { Table } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('TableCell', () => {
  it('row spans', () => {
    mount(
      <TestingPicasso>
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
      </TestingPicasso>
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('body').happoScreenshot()
  })
})
