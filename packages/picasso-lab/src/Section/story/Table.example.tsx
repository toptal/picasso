import React from 'react'
import { Button, Table } from '@toptal/picasso'
import { Section } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <Section>
      <Section.Title>Talents</Section.Title>
      <Section.Subtitle>{data.length} people</Section.Subtitle>
      <Section.Actions>
        <Button size='small' variant='secondary'>
          History
        </Button>
        <Button size='small' variant='secondary'>
          More
        </Button>
      </Section.Actions>
      <Section.Content>
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
      </Section.Content>
    </Section>
  )
}

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

export default Example
