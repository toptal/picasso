import React from 'react'
import { Table, TableProps } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { tableMockData, TestingPicasso } from '@toptal/picasso/test-utils'

const renderTable = (props: Omit<TableProps, 'children'> = {}) => (
  <TestingPicasso>
    <Table {...props}>
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
  </TestingPicasso>
)

describe('Table', () => {
  it('renders bordered', () => {
    mount(renderTable({ bordered: true }))

    cy.get('body').happoScreenshot()
  })

  it('renders compact', () => {
    mount(renderTable({ compact: true }))

    cy.get('body').happoScreenshot()
  })

  it('renders non-striped', () => {
    mount(renderTable({ striped: false }))

    cy.get('body').happoScreenshot()
  })

  it('renders bordered and non-striped', () => {
    mount(renderTable({ bordered: true, striped: false }))

    cy.get('body').happoScreenshot()
  })

  it('renders bordered, non-striped and compact', () => {
    mount(renderTable({ bordered: true, striped: false, compact: true }))

    cy.get('body').happoScreenshot()
  })
})
