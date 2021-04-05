import React from 'react'
import { Table } from '@toptal/picasso'

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

const Example = () => (
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell align='center'>Talent type</Table.Cell>
        <Table.Cell align='center'>Company</Table.Cell>
        <Table.Cell align='center'>Role</Table.Cell>
        <Table.Cell align='right'>Country</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map(row => (
        <Table.Row key={row.id}>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell align='center'>{row.talentType}</Table.Cell>
          <Table.Cell align='center'>{row.company}</Table.Cell>
          <Table.Cell align='center'>{row.role}</Table.Cell>
          <Table.Cell align='right'>{row.country}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={3}>Total</Table.Cell>
        <Table.Cell align='center'>Role</Table.Cell>
        <Table.Cell align='right'>Country</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default Example
