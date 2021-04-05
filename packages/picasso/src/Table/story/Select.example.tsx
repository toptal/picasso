import React, { useState } from 'react'
import { Table, Checkbox } from '@toptal/picasso'

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

export default Example
