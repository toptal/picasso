import React from 'react'
import { Container, Radio, Tooltip } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso/utils'

const RadioExample = () => {
  return (
    <Container padded={SPACING_6}>
      <Radio label='Radio 1' value='radio1' data-testid='trigger' />
    </Container>
  )
}

const RadioWithTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <Container padded={SPACING_6}>
      <Tooltip content={tooltipContent}>
        <Radio label='Radio 1' value='radio1' data-testid='trigger' />
      </Tooltip>
    </Container>
  )
}

const DisabledRadioWithTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <Container padded={SPACING_6}>
      <Tooltip content={tooltipContent}>
        <Container as='span'>
          <Radio
            disabled
            label='Radio 1'
            value='radio1'
            data-testid='trigger'
          />
        </Container>
      </Tooltip>
    </Container>
  )
}

const component = 'Radio'

describe('Radio', () => {
  it('renders Radio with hovered and focused state', () => {
    cy.mount(<RadioExample />)

    cy.getByTestId('trigger').hoverAndTakeHappoScreenshot({
      component,
      variant: 'default/after-hovered',
    })

    cy.get('input').focus()
    cy.get('body').happoScreenshot({
      component,
      variant: 'default/after-focused',
    })
  })

  it('shows the tooltip when hover a radio button', () => {
    cy.mount(<RadioWithTooltipExample />)

    // hover the radio button itself (not the label)
    cy.getByTestId('trigger').realHover()
    cy.getByTestId('tooltip-content').should('be.visible')
  })

  it('shows the tooltip when hover a disabled radio button', () => {
    cy.mount(<DisabledRadioWithTooltipExample />)

    // hover the radio button itself (not the label)
    cy.getByTestId('trigger').realHover()
    cy.getByTestId('tooltip-content').should('be.visible')
  })
})
