import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { Container, Radio, Tooltip } from '@toptal/picasso'

const RadioTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <TestingPicasso>
      <Container style={{ marginTop: '200px', marginLeft: '200px' }}>
        <Tooltip content={tooltipContent}>
          <Radio label='Radio 1' value='radio1' data-testid='trigger' />
        </Tooltip>
      </Container>
    </TestingPicasso>
  )
}

const DisabledRadioTooltipExample = () => {
  const tooltipContent = <span data-testid='tooltip-content'>Content</span>

  return (
    <TestingPicasso>
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
    </TestingPicasso>
  )
}

describe('Radio', () => {
  it('shows the tooltip when hover a radio button', () => {
    mount(<RadioTooltipExample />)

    // hover the radio button itself (not the label)
    cy.get('[data-testid="trigger"]').realHover()
    cy.get('[data-testid="tooltip-content"]').should('be.visible')
  })

  it('shows the tooltip when hover a disabled radio button', () => {
    mount(<DisabledRadioTooltipExample />)

    // hover the radio button itself (not the label)
    cy.get('[data-testid="trigger"]').realHover()
    cy.get('[data-testid="tooltip-content"]').should('be.visible')
  })
})
