import React from 'react'
import { mount } from '@cypress/react'
import { Container } from '@toptal/picasso'
import { DrilldownMenu } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const DrilldownMenuExample = () => {
  const menuForItemB1 = (
    <DrilldownMenu data-testid='menu-b1'>
      <DrilldownMenu.Item data-testid='item-b1-1'>Item B1-1</DrilldownMenu.Item>
      <DrilldownMenu.Item data-testid='item-b1-2'>Item B1-2</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuForItemB2 = (
    <DrilldownMenu data-testid='menu-b2'>
      <DrilldownMenu.Item data-testid='item-b2-1'>Item B2-1</DrilldownMenu.Item>
      <DrilldownMenu.Item data-testid='item-b2-2'>Item B2-2</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuForItemB = (
    <DrilldownMenu data-testid='menu-b'>
      <DrilldownMenu.Item menu={menuForItemB1} data-testid='item-b1'>
        Item B1
      </DrilldownMenu.Item>
      <DrilldownMenu.Item menu={menuForItemB2} data-testid='item-b2'>
        Item B2
      </DrilldownMenu.Item>
    </DrilldownMenu>
  )

  return (
    <TestingPicasso>
      <Container style={{ width: '240px' }}>
        <DrilldownMenu data-testid='menu'>
          <DrilldownMenu.Item data-testid='item-a'>Item A</DrilldownMenu.Item>
          <DrilldownMenu.Item menu={menuForItemB} data-testid='item-b'>
            Item B
          </DrilldownMenu.Item>
        </DrilldownMenu>
      </Container>
    </TestingPicasso>
  )
}

describe('DrilldownMenu', () => {
  it('renders nested menu', () => {
    mount(<DrilldownMenuExample />)
    cy.get('[data-testid="menu"]').should('be.visible')
    cy.get('[data-testid="menu-b"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b"').trigger('mouseover')
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b1"').trigger('mouseover')
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('be.visible')
    cy.get('[data-testid="menu-b2"]').should('not.exist')
    cy.get('body').happoScreenshot()
  })
})
