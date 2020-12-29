import React, { useState } from 'react'
import { Table, Checkbox } from '@toptal/picasso'

const Example = () => {
  const [selected, setSelected] = useState<number[]>([])

  const handleClick = (_: React.ChangeEvent<{}>, id: number) => {
    let newSelected = []

    if (selected.includes(id)) {
      newSelected = selected.filter(item => item !== id)
    } else {
      newSelected = [...selected, id]
    }

    setSelected(newSelected)
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Talent type</Table.Cell>
          <Table.Cell>Company</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(({ id, name, talentType, company, role, country }) => {
          const isSelected = selected.includes(id)

          return (
            <Table.Row
              key={id}
              hover
              selected={isSelected}
              onClick={event => handleClick(event, id)}
            >
              <Table.Cell>
                <Checkbox checked={isSelected} />
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{talentType}</Table.Cell>
              <Table.Cell>{company}</Table.Cell>
              <Table.Cell>{role}</Table.Cell>
              <Table.Cell>{country}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

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

export default Example
