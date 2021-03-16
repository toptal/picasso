import React from 'react'
import { Table, TableProps } from '@toptal/picasso'
import mount from '@cypress/react/dist'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const createData = (
  id: number,
  name: string,
  talentType: string,
  company: string,
  role: string,
  country: string
) => {
  return { id, name, talentType, company, role, country }
}

const data = [
  createData(
    0,
    'Delia Floyd',
    'Designer',
    'Airbnb',
    'UX lead',
    'United States'
  ),
  createData(1, 'Linnie Sims', 'Designer', 'Facebook', 'Art director', 'Spain'),
  createData(
    2,
    'Charles Watson',
    'Developer',
    'Amazon',
    'Ruby developer',
    'Germany'
  ),
  createData(
    3,
    'Leila Pena',
    'Developer',
    'Invision',
    'Web developer',
    'Poland'
  ),
  createData(
    4,
    'Logan Burton',
    'Developer',
    'Microsoft',
    'CTO',
    'United States'
  )
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

  it('renders compact', () => {
    mount(renderTable({ compact: true }))

    cy.get('body').happoScreenshot()
  })

  it('renders non-striped', () => {
    mount(renderTable({ striped: false }))

    cy.get('body').happoScreenshot()
  })
})
