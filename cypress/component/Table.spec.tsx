import React, { useState } from 'react'
import type { TableProps } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'
import {
  Button,
  Calendar16,
  ArrowDownMinor16,
  Checkbox,
  Container,
  More16,
  Star16,
  Table,
  Tabs,
  Tag,
  Typography,
  UserBadge,
  ArrowUpMinor16,
} from '@toptal/picasso'

const data = [
  {
    id: 0,
    name: 'Delia Floyd',
    talentType: 'Designer',
    company: 'Airbnb',
    role: 'UX lead',
    country: 'United States',
  },
  {
    id: 1,
    name: 'Linnie Sims',
    talentType: 'Designer',
    company: 'Facebook',
    role: 'Art director',
    country: 'Spain',
  },
  {
    id: 2,
    name: 'Charles Watson',
    talentType: 'Developer',
    company: 'Amazon',
    role: 'Ruby developer',
    country: 'Germany',
  },
  {
    id: 3,
    name: 'Leila Pena',
    talentType: 'Developer',
    company: 'Invision',
    role: 'Web developer',
    country: 'Poland',
  },
  {
    id: 4,
    name: 'Logan Burton',
    talentType: 'Developer',
    company: 'Microsoft',
    role: 'CTO',
    country: 'United States',
  },
]

const renderTable = (
  props: Omit<TableProps, 'children'> = {},
  sectionHeadings?: string[]
) => (
  <Table {...props}>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Talent type</Table.Cell>
        <Table.Cell>Company</Table.Cell>
        <Table.Cell>Role</Table.Cell>
        <Table.Cell>Country</Table.Cell>
      </Table.Row>
    </Table.Head>
    {sectionHeadings ? (
      sectionHeadings.map(heading => (
        <React.Fragment key={heading}>
          <Table.SectionHead icon={<Calendar16 />}>{heading}</Table.SectionHead>
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
        </React.Fragment>
      ))
    ) : (
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
    )}

    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={3}>Total</Table.Cell>
        <Table.Cell>Role</Table.Cell>
        <Table.Cell>Country</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

const SelectableExample = (props: Omit<TableProps, 'children'> = {}) => {
  const [selected, setSelected] = useState<number[]>([2, 3])

  const handleClick = (_: React.ChangeEvent<{}>, id: number) => {
    setSelected(
      selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id]
    )
  }

  return (
    <Table {...props}>
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
        {data.map(row => {
          const isSelected = selected.includes(row.id)

          return (
            <Table.Row
              key={row.id}
              hover
              selected={isSelected}
              onClick={event => handleClick(event, row.id)}
            >
              <Table.Cell>
                <Checkbox checked={isSelected} />
              </Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.talentType}</Table.Cell>
              <Table.Cell>{row.company}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
              <Table.Cell>{row.country}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total</Table.Cell>
          <Table.Cell>Role</Table.Cell>
          <Table.Cell>Country</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
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
      <UserBadge name='Jacqueline Roque'>
        <Typography data-testid='job' size='xsmall'>
          UI specialist
        </Typography>
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
  </Container>
)

const TableExpandableRowsExample = ({ localData }: { localData: Data[] }) => {
  const [expandedData, setExpandedData] = useState<{
    [id: number]: boolean
  }>({ 0: true })

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
        {localData.map(
          ({ id, task, relatedTo, time, assignee, defaultExpanded }) => (
            <Table.ExpandableRow
              key={id}
              content={<ExpandableContent />}
              expanded={expandedData[id]}
              defaultExpanded={defaultExpanded}
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
                  icon={
                    expandedData[id] ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />
                  }
                  data-testid={`expand-button-${id}`}
                  onClick={() => handleExpandClick(id)}
                />
              </Table.Cell>
            </Table.ExpandableRow>
          )
        )}
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
  defaultExpanded: boolean
}

const component = 'Table'

describe('Table', () => {
  it('renders bordered', () => {
    cy.mount(renderTable({ variant: 'bordered' }))

    cy.get('body').happoScreenshot({
      component,
      variant: 'bordered',
    })
  })

  it('renders compact and striped', () => {
    cy.mount(renderTable({ variant: 'striped', spacing: 'compact' }))

    cy.get('body').happoScreenshot({
      component,
      variant: 'compact-and-striped',
    })
  })

  it('renders narrow and clear', () => {
    cy.mount(renderTable({ variant: 'clear', spacing: 'narrow' }))

    cy.get('body').happoScreenshot({
      component,
      variant: 'narrow-and-clear',
    })
  })

  it('renders selectable table', () => {
    cy.mount(<SelectableExample />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'selectable',
    })
  })

  it('renders expandable rows', () => {
    const localData: Data[] = [
      {
        id: 0,
        task: "Invoice the client for half of Sanin's time...",
        relatedTo: 'Passionate PHP Dev...',
        time: '2:19 PM',
        assignee: 'AD',
        defaultExpanded: false,
      },
      {
        id: 1,
        task: 'BUG: try to edit skills in profile',
        relatedTo: 'Ardelia Conn',
        time: '3:27 PM',
        assignee: 'AD',
        defaultExpanded: false,
      },
      {
        id: 2,
        task: 'Assign attendee to scheduled meeting',
        relatedTo: 'Mariel Ankunding',
        time: '1:27 PM',
        assignee: 'AD',
        defaultExpanded: false,
      },
    ]

    cy.mount(<TableExpandableRowsExample localData={localData} />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'expandable-rows',
    })

    cy.getByTestId('job').as('job').should('be.visible')

    cy.getByTestId(`expand-button-${localData[0].id}`)
      .as('expandButton')
      .realClick()

    cy.get('@job').should('not.exist')
    cy.get('@expandButton').realClick()
    cy.get('@job').should('exist')
  })
  it('renders expandable rows with default expanded', () => {
    const localData: Data[] = [
      {
        id: 0,
        task: "Invoice the client for half of Sanin's time...",
        relatedTo: 'Passionate PHP Dev...',
        time: '2:19 PM',
        assignee: 'AD',
        defaultExpanded: true,
      },
      {
        id: 1,
        task: 'BUG: try to edit skills in profile',
        relatedTo: 'Ardelia Conn',
        time: '3:27 PM',
        assignee: 'AD',
        defaultExpanded: true,
      },
      {
        id: 2,
        task: 'Assign attendee to scheduled meeting',
        relatedTo: 'Mariel Ankunding',
        time: '1:27 PM',
        assignee: 'AD',
        defaultExpanded: true,
      },
    ]

    cy.mount(<TableExpandableRowsExample localData={localData} />)

    cy.get('body').happoScreenshot({
      component,
      variant: 'expandable-rows/default-expanded',
    })

    cy.getByTestId('job').as('job').should('be.visible')

    cy.getByTestId(`expand-button-${localData[0].id}`)
      .as('expandButton')
      .realClick()

    cy.get('@job').should('not.exist')
    cy.get('@expandButton').realClick()
    cy.get('@job').should('exist')
  })
})
