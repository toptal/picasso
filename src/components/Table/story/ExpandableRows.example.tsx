import React, { useState } from 'react'
import {
  Table,
  Checkbox,
  Button,
  Tabs,
  UserBadge,
  Typography,
  Label,
  Container
} from '@toptal/picasso'
import { Star16, ArrowDownMinor16, More16 } from '@toptal/picasso/Icon'

const TableExpandableRowsExample = () => {
  const [data, setData] = useState(tableData)

  const handleExpandClick = (id: number) => {
    const row = data[id]
    const toggleExpandedRow = {
      ...row,
      expanded: !row.expanded
    }

    setData({
      ...data,
      [id]: toggleExpandedRow
    })
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Tasks</Table.Cell>
          <Table.Cell>Related to</Table.Cell>
          <Table.Cell>Time</Table.Cell>
          <Table.Cell align='center'>Assignee</Table.Cell>
          <Table.Cell align='center'>Actions</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Object.values(data).map(row => (
          <Table.ExpandableRow
            key={row.id}
            content={<ExpandableContent item={row} />}
            expanded={row.expanded}
          >
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>{row.task}</Table.Cell>
            <Table.Cell>{row.relatedTo}</Table.Cell>
            <Table.Cell>{row.time}</Table.Cell>
            <Table.Cell align='center'>{row.asignee}</Table.Cell>
            <Table.Cell align='center'>
              <Button circular variant='flat' size='small' icon={<Star16 />} />
              <Button
                circular
                variant='flat'
                size='small'
                icon={<ArrowDownMinor16 />}
                data-testid={`expand-button-${row.id}`}
                onClick={() => handleExpandClick(row.id)}
              />
            </Table.Cell>
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  )
}

type ExpandableContentProps = {
  item: Data
}
const ExpandableContent = ({ item }: ExpandableContentProps) => (
  <Table.Cell colSpan={Object.keys(item).length}>
    <Tabs value={1}>
      <Tabs.Tab label='Job' />
      <Tabs.Tab label='Company' />
      <Tabs.Tab label='Task Details' />
    </Tabs>

    <Container
      flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      top='medium'
      bottom='medium'
    >
      <UserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Typography size='small'>UI specialist</Typography>
      </UserBadge>

      <Container>
        <Button variant='secondary-blue' size='small'>
          Q &amp; A
        </Button>
        <Button variant='secondary-blue' size='small'>
          Timeline
        </Button>
        <Button size='small'>Contact Company</Button>
        <Button circular variant='flat' size='small' icon={<More16 />} />
      </Container>
    </Container>

    <Container top='small'>
      <Label>$2k Design Credit</Label>
    </Container>
  </Table.Cell>
)

type Data = {
  id: number
  task: string
  relatedTo: string
  time: string
  asignee: string
  expanded: boolean
}
const tableData: {
  [id: number]: Data
} = {
  0: {
    id: 0,
    task: "Invoice the client for half of Sanin's time...",
    relatedTo: 'Passionate PHP Dev...',
    time: '2:19 PM',
    asignee: 'AD',
    expanded: false
  },
  1: {
    id: 1,
    task: 'BUG: try to edit skills in profile',
    relatedTo: 'Ardelia Conn',
    time: '3:27 PM',
    asignee: 'AD',
    expanded: false
  },
  2: {
    id: 2,
    task: 'Assign attendee to scheduled meeting',
    relatedTo: 'Mariel Ankunding',
    time: '1:27 PM',
    asignee: 'AD',
    expanded: false
  },
  3: {
    id: 3,
    task: 'Conquer The World',
    relatedTo: 'Hye Schmeler',
    time: '7:46 PM',
    asignee: 'AD',
    expanded: false
  }
}

export default TableExpandableRowsExample
