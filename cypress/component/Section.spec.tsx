import React from 'react'
import { mount } from '@cypress/react'
import {
  Table,
  Button,
  Container,
  Section,
  SectionProps,
} from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const talents = [
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

const TestSection = ({
  title = 'Talents',
  subtitle = `${talents.length} people`,
  children = (
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
        {talents.map(talent => (
          <Table.Row key={talent.id}>
            <Table.Cell>{talent.name}</Table.Cell>
            <Table.Cell>{talent.talentType}</Table.Cell>
            <Table.Cell>{talent.company}</Table.Cell>
            <Table.Cell>{talent.role}</Table.Cell>
            <Table.Cell>{talent.country}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
  actions,
  collapsible,
  defaultCollapsed,
  ...rest
}: Partial<SectionProps>) => {
  return (
    <TestingPicasso>
      {/* The Container wrapper makes it easy to see the borders on the screenshot */}
      <Container
        variant={
          rest.variant === 'bordered' || rest.variant === 'withHeaderBar'
            ? 'grey'
            : undefined
        }
        padded={
          rest.variant === 'bordered' || rest.variant === 'withHeaderBar'
            ? 'large'
            : undefined
        }
      >
        <Section
          title={title}
          subtitle={subtitle}
          actions={actions}
          collapsible={collapsible}
          defaultCollapsed={defaultCollapsed}
          {...rest}
        >
          {children}
        </Section>
      </Container>
    </TestingPicasso>
  )
}

describe('Section', () => {
  it('renders', () => {
    mount(<TestSection />)

    cy.get('body').happoScreenshot()
  })

  it('renders with actions', () => {
    mount(
      <TestSection
        actions={
          <Button size='small' variant='secondary'>
            More
          </Button>
        }
      />
    )

    cy.get('body').happoScreenshot()
  })

  it('renders with bordered variant', () => {
    mount(<TestSection variant='bordered' />)

    cy.get('body').happoScreenshot()
  })
  it('renders with withHeaderBar variant', () => {
    mount(<TestSection variant='withHeaderBar' />)

    cy.get('body').happoScreenshot()
  })
  describe('when collapsible', () => {
    it('renders initially collapsed', () => {
      mount(<TestSection collapsible />)

      cy.get('body').happoScreenshot()
    })

    it('renders initially expanded', () => {
      mount(
        <TestSection
          defaultCollapsed={false}
          actions={
            <Button size='small' variant='secondary'>
              More
            </Button>
          }
          collapsible
        />
      )

      cy.get('body').happoScreenshot()
    })
  })
})
