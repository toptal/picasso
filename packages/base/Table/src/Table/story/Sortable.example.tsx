/* eslint-disable id-length */
import React, { useMemo } from 'react'
import { Table, TableSortableCell } from '@toptal/picasso'

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
  },
]

const sortAlphabetically = (
  a: string,
  b: string,
  direction: 'asc' | 'desc'
) => {
  if (direction === 'asc') {
    return a.localeCompare(b)
  }

  return b.localeCompare(a)
}

const Example = () => {
  const [sortState, setSortState] = React.useState<{
    key: 'name' | 'talentType'
    direction: 'asc' | 'desc'
  }>({
    key: 'name',
    direction: 'asc',
  })

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      return sortAlphabetically(
        a[sortState.key],
        b[sortState.key],
        sortState.direction
      )
    })
  }, [sortState])

  const onSort = (key: 'name' | 'talentType') => {
    setSortState({
      key,
      direction:
        sortState.key === key && sortState.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.Row>
            <TableSortableCell
              onSortClick={() => onSort('name')}
              sortDirection={
                sortState.key === 'name' && sortState.direction === 'desc'
                  ? 'desc'
                  : 'asc'
              }
            >
              Name
            </TableSortableCell>
            <TableSortableCell
              onSortClick={() => onSort('talentType')}
              sortDirection={
                sortState.key === 'talentType' && sortState.direction === 'desc'
                  ? 'desc'
                  : 'asc'
              }
            >
              Talent type
            </TableSortableCell>
            <Table.Cell>Company</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map(row => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.talentType}</Table.Cell>
              <Table.Cell>{row.company}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Example
