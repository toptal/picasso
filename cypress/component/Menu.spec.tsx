import React from 'react'
import { mount } from '@cypress/react'
import { Container, Menu, MenuProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const MenuExample = (props: MenuProps) => {
  const menuForItemB1 = (
    <Menu data-testid='menu-b1'>
      <Menu.Item data-testid='item-b1-1'>Item B1-1</Menu.Item>
      <Menu.Item data-testid='item-b1-2'>Item B1-2</Menu.Item>
    </Menu>
  )

  const menuForItemB2 = (
    <Menu data-testid='menu-b2'>
      <Menu.Item data-testid='item-b2-1'>Item B2-1</Menu.Item>
      <Menu.Item data-testid='item-b2-2'>Item B2-2</Menu.Item>
    </Menu>
  )

  const menuForItemB = (
    <Menu data-testid='menu-b'>
      <Menu.Item menu={menuForItemB1} data-testid='item-b1'>
        Item B1
      </Menu.Item>
      <Menu.Item menu={menuForItemB2} data-testid='item-b2'>
        Item B2
      </Menu.Item>
    </Menu>
  )

  return (
    <TestingPicasso>
      <Container style={{ width: '240px' }}>
        <Menu {...props} data-testid='menu'>
          <Menu.Item data-testid='item-a'>Item A</Menu.Item>
          <Menu.Item menu={menuForItemB} data-testid='item-b'>
            Item B
          </Menu.Item>
        </Menu>
      </Container>
    </TestingPicasso>
  )
}

describe('Menu', () => {
  it('navigates stack menu', () => {
    mount(<MenuExample />)
    cy.get('[data-testid="menu-b"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b"').click()
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b1"').click()
    cy.get('[data-testid="menu-b1"]').should('be.visible')
    cy.get('[data-testid="menu-b2"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="menu-back"').last().click()
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="menu-back"').click()
    cy.get('[data-testid="menu-b"]').should('not.exist')
    cy.get('[data-testid="menu-back"]').should('not.exist')
    cy.get('body').happoScreenshot()
  })
})
