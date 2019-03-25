import React from 'react'
import { Table, Checkbox } from '@toptal/picasso'

class SelectTableExample extends React.Component {
  state = {
    selected: []
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...selected, id]
    } else {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1)
      ]
    }

    this.setState({ selected: newSelected })
  }

  isSelected = id => {
    const { selected } = this.state

    return selected.indexOf(id) !== -1
  }

  render () {
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
          {data.map(n => {
            const isSelected = this.isSelected(n.id)

            return (
              <Table.Row
                key={n.id}
                hover
                selected={isSelected}
                onClick={event => this.handleClick(event, n.id)}
              >
                <Table.Cell>
                  <Checkbox checked={isSelected} />
                </Table.Cell>
                <Table.Cell>{n.name}</Table.Cell>
                <Table.Cell>{n.talentType}</Table.Cell>
                <Table.Cell>{n.company}</Table.Cell>
                <Table.Cell>{n.role}</Table.Cell>
                <Table.Cell>{n.country}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}

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

export default SelectTableExample
