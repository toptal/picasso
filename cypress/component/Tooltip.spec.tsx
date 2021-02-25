import React from 'react'
import { mount } from '@cypress/react'
import { Button, Tooltip, Typography } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TooltipExample = () => (
  <TestingPicasso>
    <Tooltip content={<Typography data-testid='content'>Content</Typography>}>
      <Button data-testid='trigger'>Trigger</Button>
    </Tooltip>
  </TestingPicasso>
)

describe('Tooltip', () => {
  it('opens and closes by keyboard navigation', () => {
    mount(<TooltipExample />)
    cy.get('[data-testid=trigger]').focus()
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=trigger]').blur()
    cy.get('[data-testid=content]').should('not.be.visible')
  })

  it('opens and closes by mouse navigation', () => {
    mount(<TooltipExample />)
    cy.get('[data-testid=trigger]').trigger('mouseover')
    cy.get('[data-testid=content]').should('be.visible')

    cy.get('[data-testid=trigger]').trigger('mouseout')
    cy.get('[data-testid=content]').should('not.be.visible')
  })
})
