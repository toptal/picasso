import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Calendar16,
  ArrowDownMinor16,
  Checkbox,
  Container,
  More16,
  Star16,
  Table,
  TableProps,
  Tabs,
  Tag,
  Typography,
  UserBadge
} from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

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

const renderTable = (
  props: Omit<TableProps, 'children'> = {},
  sectionHeadings?: string[]
) => (
  <TestingPicasso>
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
            <Table.SectionHead icon={<Calendar16 />}>
              {heading}
            </Table.SectionHead>
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
  </TestingPicasso>
)

const SelectableExample = (props: Omit<TableProps, 'children'> = {}) => {
  const [selected, setSelected] = useState<number[]>([2, 3])

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
    <TestingPicasso>
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
    </TestingPicasso>
  )
}

type StyledArrowDownMinor16Props = {
  expanded: boolean
}
const StyledArrowDownMinor16 = styled(ArrowDownMinor16)`
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: rotate(
    ${(props: StyledArrowDownMinor16Props) =>
      props.expanded ? '180deg' : '0deg'}
  );
`

const ExpandableContent = () => (
  <Container padded='small'>
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
      <UserBadge name='Jacqueline Roque'>
        <Typography data-testid='job' size='small'>
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

    <Container top='small'>
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
      [id]: !expanded
    })
  }

  return (
    <TestingPicasso>
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
                      <StyledArrowDownMinor16 expanded={expandedData[id]} />
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
    </TestingPicasso>
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

describe('Table', () => {
  it('renders default', () => {
    mount(renderTable())

    cy.get('body').happoScreenshot()
  })

  it('renders clear', () => {
    mount(renderTable({ variant: 'clear' }))

    cy.get('body').happoScreenshot()
  })

  it('renders striped', () => {
    mount(renderTable({ variant: 'striped' }))

    cy.get('body').happoScreenshot()
  })

  it('renders bordered', () => {
    mount(renderTable({ variant: 'bordered' }))

    cy.get('body').happoScreenshot()
  })

  it('renders narrow', () => {
    mount(renderTable({ spacing: 'narrow' }))

    cy.get('body').happoScreenshot()
  })

  it('renders compact', () => {
    mount(renderTable({ spacing: 'compact' }))

    cy.get('body').happoScreenshot()
  })

  it('renders compact and striped', () => {
    mount(renderTable({ variant: 'striped', spacing: 'compact' }))

    cy.get('body').happoScreenshot()
  })

  it('renders narrow and clear', () => {
    mount(renderTable({ variant: 'clear', spacing: 'narrow' }))

    cy.get('body').happoScreenshot()
  })

  it('renders with section heading', () => {
    mount(renderTable({}, ['January']))

    cy.get('body').happoScreenshot()
  })

  it('renders with multiple section headings', () => {
    mount(renderTable({}, ['January', 'February']))

    cy.get('body').happoScreenshot()
  })

  it('renders selectable table', () => {
    mount(<SelectableExample />)

    cy.get('body').happoScreenshot()
  })

  it('renders expandable rows', () => {
    const localData: Data[] = [
      {
        id: 0,
        task: "Invoice the client for half of Sanin's time...",
        relatedTo: 'Passionate PHP Dev...',
        time: '2:19 PM',
        assignee: 'AD',
        defaultExpanded: false
      },
      {
        id: 1,
        task: 'BUG: try to edit skills in profile',
        relatedTo: 'Ardelia Conn',
        time: '3:27 PM',
        assignee: 'AD',
        defaultExpanded: false
      },
      {
        id: 2,
        task: 'Assign attendee to scheduled meeting',
        relatedTo: 'Mariel Ankunding',
        time: '1:27 PM',
        assignee: 'AD',
        defaultExpanded: false
      }
    ]

    mount(<TableExpandableRowsExample localData={localData} />)

    cy.get('body').happoScreenshot()

    cy.get('[data-testid="job"]').as('job').should('be.visible')

    cy.get('table > tbody > tr > td:last-child > button:last-child')
      .as('collapseButton')
      .realClick()

    cy.get('@job').should('not.exist')
    cy.get('@collapseButton').realClick()
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
        defaultExpanded: true
      },
      {
        id: 1,
        task: 'BUG: try to edit skills in profile',
        relatedTo: 'Ardelia Conn',
        time: '3:27 PM',
        assignee: 'AD',
        defaultExpanded: true
      },
      {
        id: 2,
        task: 'Assign attendee to scheduled meeting',
        relatedTo: 'Mariel Ankunding',
        time: '1:27 PM',
        assignee: 'AD',
        defaultExpanded: true
      }
    ]

    mount(<TableExpandableRowsExample localData={localData} />)

    cy.get('body').happoScreenshot()

    cy.get('[data-testid="job"]').as('job').should('be.visible')

    cy.get('table > tbody > tr > td:last-child > button:last-child')
      .as('collapseButton')
      .realClick()

    cy.get('@job').should('not.exist')
    cy.get('@collapseButton').realClick()
    cy.get('@job').should('exist')
  })
})
