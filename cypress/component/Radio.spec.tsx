import React from 'react'
import { Container, Radio, Tooltip } from '@toptal/picasso'

const RadioExample = () => {
  return (
    <TestingPicasso>
      <Container padded='medium'>
        <Radio label='Radio 1' value='radio1' data-testid='trigger' />
      </Container>
    </TestingPicasso>
  )
}

const TestRadioWithTooltip = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <Container padded='medium'>
      <Tooltip content={tooltipContent}>
        <Radio label='Radio 1' value='radio1' data-testid='trigger' />
      </Tooltip>
    </Container>
  )
}

const TestDisabledRadioWithTooltip = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <Container padded='medium'>
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

const COMPONENT = 'Radio'

describe('Radio', () => {
  it('renders Radio with hovered and focused state', () => {
    mount(<RadioExample />)

    // happo doesn't retain hover state but it has a workaround
    // "data-happo-hover" is being added and removed to mimic the state
    cy.getByTestId('trigger')
      .invoke('attr', 'data-happo-hover', true)
      .get('body')
      .happoScreenshot({
        component: COMPONENT,
        variant: 'default/after-hovered',
      })
    cy.getByTestId('trigger').invoke('removeAttr', 'data-happo-hover')

    cy.get('input').focus().get('body').happoScreenshot({
      component: COMPONENT,
      variant: 'default/after-focused',
    })
  })

  it('shows the tooltip when hover a radio button', () => {
    cy.mount(<TestRadioWithTooltip />)

    // hover the radio button itself (not the label)
    cy.getByTestId('trigger').realHover()
    cy.getByTestId('tooltip-content').should('be.visible')
  })

  it('shows the tooltip when hover a disabled radio button', () => {
    cy.mount(<TestDisabledRadioWithTooltip />)

    // hover the radio button itself (not the label)
    cy.getByTestId('trigger').realHover()
    cy.getByTestId('tooltip-content').should('be.visible')
  })
})
