import React from 'react'
import { Table } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const AlignExample = () => (
  <div>
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Default</Table.Cell>
          <Table.Cell>Left</Table.Cell>
          <Table.Cell>Center</Table.Cell>
          <Table.Cell>Right</Table.Cell>
          <Table.Cell>Justify</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(row => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell align='left'>{row.talentType}</Table.Cell>
            <Table.Cell align='center'>{row.company}</Table.Cell>
            <Table.Cell align='right'>{row.role}</Table.Cell>
            <Table.Cell align='justify'>{row.country}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
)

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
    cy.get('body').happoScreenshot()
  })

  it('align cells', () => {
    mount(
      <TestingPicasso>
        <AlignExample />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})

let id = 0

const createData = (
  name: string,
  talentType: string,
  company: string,
  role: string,
  country: string
) => {
  id += 1

  return { id, name, talentType, company, role, country }
}

const data = [
  createData('Delia Floyd', 'Designer', 'Airbnb', 'UX lead', 'United States'),
  createData('Linnie Sims', 'Designer', 'Facebook', 'Art director', 'Spain'),
  createData(
    'Charles Watson',
    'Developer',
    'Amazon',
    'Ruby developer',
    'Germany'
  ),
  createData('Leila Pena', 'Developer', 'Invision', 'Web developer', 'Poland'),
  createData('Logan Burton', 'Developer', 'Microsoft', 'CTO', 'United States')
]
