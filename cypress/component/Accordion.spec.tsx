import React, { useState } from 'react'
import {
  Accordion,
  AccordionProps,
  Typography,
  Button,
  Container,
  Check16
} from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestAccordion = (props: Partial<AccordionProps>) => (
  <Accordion
    data-testid='accordion'
    content='Aliqua ut aliquip dolor velit.'
    {...props}
  >
    <Accordion.Summary>
      Est amet duis deserunt proident Lorem.
    </Accordion.Summary>
  </Accordion>
)

const Summary = ({
  onClick,
  expanded
}: {
  onClick: () => void
  expanded: boolean
}) => (
  <Container
    flex
    alignItems='center'
    justifyContent='space-between'
    bottom='small'
    top='small'
  >
    <Typography variant='heading' size='medium'>
      Upcoming interviews
    </Typography>
    <Container>
      <Button variant='secondary' onClick={onClick} data-testid='trigger'>
        {expanded ? 'Hide' : 'Show'}
      </Button>
    </Container>
  </Container>
)

const Content = () => (
  <Container
    bordered
    flex
    justifyContent='space-around'
    padded='medium'
    data-testid='content'
  >
    <Button
      data-testid='start-onboarding'
      size='small'
      onClick={() => window.alert('Onboarding started')}
    >
      Start Interview Onboarding
    </Button>
  </Container>
)

const AccordionCustomSummary = () => {
  const [expanded, setExpanded] = useState(true)

  const handleClick = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  return (
    <TestingPicasso>
      <Summary onClick={handleClick} expanded={expanded} />
      <Accordion
        data-testid='accordion-custom-summary'
        content={<Content />}
        expanded={expanded}
        borders='none'
      />
    </TestingPicasso>
  )
}

const toggleAccordion = () => cy.get('[data-testid=trigger]').click()
const getAccordionContent = () => cy.get('[data-testid=content]')
const clickStartInterviewOnboarding = () =>
  cy.get('[data-testid="start-onboarding"]').click()

describe('Accordion', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <TestAccordion />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders disabled', () => {
    mount(
      <TestingPicasso>
        <TestAccordion disabled />
        <TestAccordion expandIcon={<Check16 />} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders border variants', () => {
    mount(
      <TestingPicasso>
        <TestAccordion borders='none' />
        <TestAccordion borders='middle' />
        <TestAccordion borders='all' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders expanded initially', () => {
    mount(
      <TestingPicasso>
        <TestAccordion defaultExpanded />
        <TestAccordion expanded />
        <TestAccordion expanded={false} />
        <TestAccordion disabled />
        <TestAccordion expandIcon={<Check16 />} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  it('renders collapsed initially', () => {
    mount(
      <TestingPicasso>
        <TestAccordion expanded={false} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders custom expand icon', () => {
    mount(
      <TestingPicasso>
        <TestAccordion disabled />
        <TestAccordion expandIcon={<Check16 />} />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
describe('Accordion with custom summary', () => {
  it('closes and opens', () => {
    mount(<AccordionCustomSummary />)
    toggleAccordion()
    getAccordionContent().should('not.be.visible')

    cy.get('[data-testid=accordion-custom-summary]').happoScreenshot()

    toggleAccordion()
    getAccordionContent().should('be.visible')

    cy.get('[data-testid=accordion-custom-summary]').happoScreenshot()
  })

  it('interacts with accordion content', () => {
    mount(<AccordionCustomSummary />)

    clickStartInterviewOnboarding()

    cy.get('[data-testid=accordion-custom-summary]').happoScreenshot()

    cy.on('window:alert', text => {
      expect(text).equal('Onboarding started')
    })
  })
})
