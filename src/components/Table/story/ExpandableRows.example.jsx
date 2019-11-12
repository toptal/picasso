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

  const handleExpandClick = id => {
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
          <Table.Cell>Due Date</Table.Cell>
          <Table.Cell>Related to</Table.Cell>
          <Table.Cell>Time</Table.Cell>
          <Table.Cell align='center'>Assignee</Table.Cell>
          <Table.Cell align='center'>Actions</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Object.values(data).map(row => (
          <React.Fragment key={row.id}>
            <Table.Row>
              <Table.Cell>
                <Checkbox />
              </Table.Cell>
              <Table.Cell>{row.task}</Table.Cell>
              <Table.Cell>{row.dueDate}</Table.Cell>
              <Table.Cell>{row.relatedTo}</Table.Cell>
              <Table.Cell>{row.time}</Table.Cell>
              <Table.Cell align='center'>{row.asignee}</Table.Cell>
              <Table.Cell align='center'>
                <Actions onExpandClick={() => handleExpandClick(row.id)} />
              </Table.Cell>
            </Table.Row>
            <ExpandableContent item={row} expanded={row.expanded} />
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  )
}

const createData = (id, task, dueDate, relatedTo, time, asignee) => {
  return {
    id,
    task,
    dueDate,
    relatedTo,
    time,
    asignee,
    expanded: false
  }
}

const ExpandableContent = ({ item, expanded }) => (
  <Table.ExpandableRow expanded={expanded}>
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
  </Table.ExpandableRow>
)

const Actions = ({ onStarClick, onExpandClick }) => (
  <React.Fragment>
    <Button
      circular
      variant='flat'
      size='small'
      icon={<Star16 />}
      onClick={onStarClick}
    />
    <Button
      circular
      variant='flat'
      size='small'
      icon={<ArrowDownMinor16 />}
      onClick={onExpandClick}
    />
  </React.Fragment>
)

const tableData = {
  0: createData(
    0,
    "Invoice the client for half of Sanin's time...",
    'May 20, 2014',
    'Passionate PHP Dev...',
    '2:19 PM',
    'AD'
  ),
  1: createData(
    1,
    'BUG: try to edit skills in profile',
    'Sep 7, 2015',
    'Ardelia Conn',
    '3:27 PM',
    'AD'
  ),
  2: createData(
    2,
    'Assign attendee to scheduled meeting',
    'Oct 10, 2016',
    'Mariel Ankunding',
    '1:27 PM',
    'AD'
  ),
  3: createData(
    3,
    'Conquer The World',
    'Jul 30, 2017',
    'Hye Schmeler',
    '7:46 PM',
    'AD'
  )
}

export default TableExpandableRowsExample
