import React from 'react'
import { Table, TableProps } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States'
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain'
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany'
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland'
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States'
  }
]

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
        {data.map(row => (
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

  it('renders narrow', () => {
    mount(renderTable({ narrow: true }))

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
