import React from 'react'
import { Container, Radio, Tooltip } from '@toptal/picasso'

const RadioTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <Container style={{ marginTop: '200px', marginLeft: '200px' }}>
      <Tooltip content={tooltipContent}>
        <Radio label='Radio 1' value='radio1' data-testid='trigger' />
      </Tooltip>
    </Container>
  )
}

const DisabledRadioTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <Container style={{ marginTop: '200px', marginLeft: '200px' }}>
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

describe('Radio', () => {
  it('shows the tooltip when hover a radio button', () => {
    cy.mount(<RadioTooltipExample />)

    // hover the radio button itself (not the label)
    cy.get('[data-testid="trigger"]').realHover()
    cy.get('[data-testid="tooltip-content"]').should('be.visible')
  })

  it('shows the tooltip when hover a disabled radio button', () => {
    cy.mount(<DisabledRadioTooltipExample />)

    // hover the radio button itself (not the label)
    cy.get('[data-testid="trigger"]').realHover()
    cy.get('[data-testid="tooltip-content"]').should('be.visible')
  })
})
