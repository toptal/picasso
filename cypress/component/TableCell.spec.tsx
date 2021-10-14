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

  it('aligns cells', () => {
    mount(
      <TestingPicasso>
        <AlignExample />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})

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
