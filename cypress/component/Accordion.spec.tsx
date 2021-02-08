/* eslint-disable no-inline-styles/no-inline-styles */
import React, { useState } from 'react'
import { Accordion, Typography, Button, Container, Page } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

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
      <Page>
        <Page.Article>
          <Summary onClick={handleClick} expanded={expanded} />
          <Accordion content={<Content />} expanded={expanded} borders='none' />
        </Page.Article>
      </Page>
    </TestingPicasso>
  )
}

const toggleAccordion = () => cy.get('[data-testid=trigger]').click()
const getAccordionContent = () => cy.get('[data-testid=content]')
const clickStartInterviewOnboarding = () =>
  cy.get('[data-testid="start-onboarding"]').click()

describe('Accordion with custom summary', () => {
  it('closes and opens', () => {
    mount(<AccordionCustomSummary />)
    toggleAccordion()
    getAccordionContent().should('not.be.visible')
    // TODO: Add visual regression test
    toggleAccordion()
    getAccordionContent().should('be.visible')
    // TODO: Add visual regression test
  })

  it('interacts with accordion content', () => {
    mount(<AccordionCustomSummary />)

    clickStartInterviewOnboarding()
    // TODO: Add visual regression test

    cy.on('window:alert', text => {
      expect(text).equal('Onboarding started')
    })
  })
})
