import React, { useState } from 'react'
import {
  Accordion,
  Typography,
  Button,
  Container,
  Check16,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'

const Summary = ({
  onClick,
  expanded,
}: {
  onClick: () => void
  expanded: boolean
}) => (
  <Container
    flex
    alignItems='center'
    justifyContent='space-between'
    bottom={SPACING_4}
    top={SPACING_4}
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
    padded={SPACING_6}
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
    <>
      <Summary onClick={handleClick} expanded={expanded} />
      <Accordion
        data-testid='accordion-custom-summary'
        content={<Content />}
        expanded={expanded}
        borders='none'
      />
    </>
  )
}

const component = 'Accordion'

describe('Accordion', () => {
  it('renders custom summary and content', () => {
    cy.mount(<AccordionCustomSummary />)
    cy.getByTestId('trigger').click()
    cy.getByTestId('content').should('not.be.visible')

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-summary-content/before-expanded',
    })

    cy.getByTestId('trigger').click()
    cy.getByTestId('content').should('be.visible')

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-summary-content/after-expanded',
    })

    // check if content is interactive
    cy.getByTestId('start-onboarding').click()
    cy.on('window:alert', text => {
      expect(text).equal('Onboarding started')
    })
  })

  it('renders custom expand icon', () => {
    cy.mount(
      <Accordion
        data-testid='accordion'
        content='Aliqua ut aliquip dolor velit.'
        expandIcon={<Check16 />}
      >
        <Accordion.Summary>
          Est amet duis deserunt proident Lorem.
        </Accordion.Summary>
      </Accordion>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-expand-icon',
    })
  })
})
