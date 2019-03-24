import React from 'react'
import { Table } from '@toptal/picasso'

const TableDefaultExample = () => (
  <div>
    <Table>
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
    </Table>
  </div>
)

const createData = (id, name, talentType, company, role, country) => {
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

export default TableDefaultExample
