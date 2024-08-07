import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Table,
  Checkbox,
  Button,
  Tabs,
  UserBadge,
  Typography,
  Tag,
  Container,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'
import { Star16, ArrowDownMinor16, More16 } from '@toptal/picasso-icons'

type StyledArrowDownMinor16Props = {
  expanded: boolean
}
const StyledArrowDownMinor16 = styled(
  ArrowDownMinor16
)<StyledArrowDownMinor16Props>`
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
`

const DynamicContent = () => {
  const [isLoaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 1000)
  })

  return (
    <Container className='max-w-[500px]'>
      {isLoaded ? (
        <Typography size='small'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi placeat
          dolorem provident, aut aspernatur doloribus eos reiciendis molestiae
          ab quidem ad facilis animi dolorum quis laborum possimus temporibus
          debitis maiores ullam neque? Tempora rem eligendi ex consectetur
          impedit eos optio illum voluptates. Quis expedita, rerum reiciendis
          hic quae molestiae sit doloribus, beatae assumenda illo non iste
          itaque deleniti! Expedita ducimus, deleniti accusantium iusto adipisci
          nesciunt inventore! Laborum, repudiandae temporibus eligendi
          blanditiis laudantium suscipit. Tempore culpa, consequuntur placeat,
          inventore cumque vitae recusandae at consequatur praesentium
          asperiores sunt porro beatae, ipsa dicta laboriosam quae voluptatum.
          Magnam animi ea sint ex, ipsum explicabo. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Modi placeat dolorem provident, aut
          aspernatur doloribus eos reiciendis molestiae ab quidem ad facilis
          animi dolorum quis laborum possimus temporibus debitis maiores ullam
          neque? Tempora rem eligendi ex consectetur impedit eos optio illum
          voluptates. Quis expedita, rerum reiciendis hic quae molestiae sit
          doloribus, beatae assumenda illo non iste itaque deleniti! Expedita
          ducimus, deleniti accusantium iusto adipisci nesciunt inventore!
          Laborum, repudiandae temporibus eligendi blanditiis laudantium
          suscipit. Tempore culpa, consequuntur placeat, inventore cumque vitae
          recusandae at consequatur praesentium asperiores sunt porro beatae,
          ipsa dicta laboriosam quae voluptatum. Magnam animi ea sint ex, ipsum
          explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      ) : (
        <Typography size='small'>Loading dynamic content...</Typography>
      )}
    </Container>
  )
}

const ExpandableContent = () => (
  <Container padded={SPACING_4}>
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
      top={SPACING_6}
      bottom={SPACING_6}
    >
      <UserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      >
        <Typography size='xsmall'>UI specialist</Typography>
      </UserBadge>

      <Container>
        <Button variant='secondary' size='small'>
          Q &amp; A
        </Button>
        <Button variant='secondary' size='small'>
          Timeline
        </Button>
        <Button size='small'>Contact Company</Button>
        <Button.Circular variant='flat' icon={<More16 />} />
      </Container>
    </Container>

    <Container top={SPACING_4}>
      <Tag>$2k Design Credit</Tag>
    </Container>
    <DynamicContent />
  </Container>
)

const TableExpandableRowsExample = () => {
  const [expandedData, setExpandedData] = useState<{
    [id: number]: boolean
  }>({})

  const handleExpandClick = (id: number) => {
    const expanded = expandedData[id]

    setExpandedData({
      ...expandedData,
      [id]: !expanded,
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
        {data.map(({ id, task, relatedTo, time, assignee }) => (
          <Table.ExpandableRow
            key={id}
            content={<ExpandableContent />}
            expanded={expandedData[id]}
          >
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
            <Table.Cell>{task}</Table.Cell>
            <Table.Cell>{relatedTo}</Table.Cell>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell align='center'>{assignee}</Table.Cell>
            <Table.Cell align='center'>
              <Button.Circular variant='flat' icon={<Star16 />} />
              <Button.Circular
                variant='flat'
                icon={<StyledArrowDownMinor16 expanded={expandedData[id]} />}
                data-testid={`expand-button-${id}`}
                onClick={() => handleExpandClick(id)}
              />
            </Table.Cell>
          </Table.ExpandableRow>
        ))}
      </Table.Body>
    </Table>
  )
}

type Data = {
  id: number
  task: string
  relatedTo: string
  time: string
  assignee: string
  expanded: boolean
}
const data: Data[] = [
  {
    id: 0,
    task: "Invoice the client for half of Sanin's time...",
    relatedTo: 'Passionate PHP Dev...',
    time: '2:19 PM',
    assignee: 'AD',
    expanded: false,
  },
  {
    id: 1,
    task: 'BUG: try to edit skills in profile',
    relatedTo: 'Ardelia Conn',
    time: '3:27 PM',
    assignee: 'AD',
    expanded: false,
  },
  {
    id: 2,
    task: 'Assign attendee to scheduled meeting',
    relatedTo: 'Mariel Ankunding',
    time: '1:27 PM',
    assignee: 'AD',
    expanded: false,
  },
  {
    id: 3,
    task: 'Conquer The World',
    relatedTo: 'Hye Schmeler',
    time: '7:46 PM',
    assignee: 'AD',
    expanded: false,
  },
]

export default TableExpandableRowsExample
