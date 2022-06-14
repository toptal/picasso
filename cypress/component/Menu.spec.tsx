import React from 'react'
import { Container, Menu, MenuProps } from '@toptal/picasso'

const testIds = {
  menuItem: 'menu-back',
}

const MenuExample = (props: MenuProps) => {
  const menuForItemB1 = (
    <Menu data-testid='menu-b1' testIds={testIds}>
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
    <Menu data-testid='menu-b' testIds={testIds}>
      <Menu.Item menu={menuForItemB1} data-testid='item-b1'>
        Item B1
      </Menu.Item>
      <Menu.Item menu={menuForItemB2} data-testid='item-b2'>
        Item B2
      </Menu.Item>
    </Menu>
  )

  return (
    <Container style={{ width: '240px' }}>
      <Menu {...props} data-testid='menu'>
        <Menu.Item data-testid='item-a'>Item A</Menu.Item>
        <Menu.Item menu={menuForItemB} data-testid='item-b'>
          Item B
        </Menu.Item>
      </Menu>
    </Container>
  )
}

describe('Menu', () => {
  it('navigates slide menu', () => {
    cy.mount(<MenuExample />)
    cy.get('[data-testid="menu-b"]').should('not.exist')
    cy.get(`[data-testid="${testIds.menuItem}"]`).should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b"]').click()
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b1"]').click()
    cy.get('[data-testid="menu-b1"]').should('be.visible')
    cy.get('[data-testid="menu-b2"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get(`[data-testid="${testIds.menuItem}"`).last().click()
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get(`[data-testid="${testIds.menuItem}"`).click()
    cy.get('[data-testid="menu-b"]').should('not.exist')
    cy.get(`[data-testid="${testIds.menuItem}"]`).should('not.exist')
    cy.get('body').happoScreenshot()
  })

  it('navigates drilldown menu', () => {
    cy.mount(<MenuExample variant='drilldown' />)
    cy.get('[data-testid="menu-b"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b"]').trigger('mouseover')
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="item-b1"]').trigger('mouseover')
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('be.visible')
    cy.get('body').happoScreenshot()

    cy.get('[data-testid="menu-b1"]').trigger('mouseout')
    cy.get('[data-testid="item-b"]').trigger('mouseover')
    cy.get('[data-testid="menu-b"]').should('be.visible')
    cy.get('[data-testid="menu-b1"]').should('not.exist')
    cy.get('body').happoScreenshot()
  })
})
