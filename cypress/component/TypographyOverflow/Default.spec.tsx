import React from 'react'
import {
  Checkbox,
  Container,
  Typography,
  TypographyOverflow,
} from '@toptal/picasso'

import {
  component,
  DefaultExample,
  expectNothingAfter,
  hoverAndClickLink,
} from './test-helpers'

const CheckboxLabelExample = () => (
  <Container
    flex
    padded='medium'
    style={{ marginTop: 100, maxWidth: '150px', flexBasis: '150px' }}
  >
    <Checkbox
      label={
        <TypographyOverflow data-testid='ellipsed-text'>
          This typography is very long and therefore it overflows.
        </TypographyOverflow>
      }
    />
  </Container>
)

const CustomTooltipAndDelayExample = () => (
  <Container padded='medium' style={{ width: 300, marginTop: 100 }}>
    <TypographyOverflow
      data-testid='custom-tooltip-ellipsed-text'
      tooltipContent={
        <Typography color='yellow' weight='semibold'>
          This typography is very long and therefore it overflows.
        </Typography>
      }
    >
      This typography is very long and therefore it overflows.
    </TypographyOverflow>

    <div style={{ marginTop: 100 }}>
      <TypographyOverflow
        tooltipDelay='long'
        data-testid='long-delay-ellipsed-text'
      >
        Long delay. This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
  </Container>
)

describe('TypographyOverflow', () => {
  it('renders', () => {
    cy.mount(<DefaultExample />)

    cy.getByTestId('ellipsed-text').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-hovered-static-width',
    })

    cy.get('body').click(0, 0)
    cy.getByRole('tooltip').should('not.exist')

    cy.getByTestId('ellipsed-text-dynamic-width').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-hovered-dynamic-width',
    })
  })

  it('adds nothing after the text outside Safari', () => {
    cy.mount(<DefaultExample />)

    cy.getByTestId('ellipsed-text').should(expectNothingAfter)
  })

  it('keeps a link inside clickable', () => {
    hoverAndClickLink()
  })

  it('renders with Checkbox label', () => {
    cy.mount(<CheckboxLabelExample />)

    cy.getByTestId('ellipsed-text').click()
    // blur before screenshot so the synthetic-event focus ring doesn't leak into the capture
    cy.focused().blur()
    cy.get('body').happoScreenshot({
      component,
      variant: 'checkbox-label/after-hovered',
    })
  })

  it('renders with custom tooltip', () => {
    cy.mount(<CustomTooltipAndDelayExample />)

    cy.getByTestId('custom-tooltip-ellipsed-text').click()
    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-tooltip/after-hovered',
    })

    cy.getByTestId('long-delay-ellipsed-text').click()
    cy.getByRole('tooltip')
      .contains(
        'Long delay. This typography is very long and therefore it overflows.'
      )
      .should('be.visible')
  })
})
