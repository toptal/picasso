import React from 'react'
import type { MenuProps } from '@toptal/picasso'
import { Container, Menu } from '@toptal/picasso'

const MenuExample = (props: MenuProps) => {
  const menuForItemB1 = (
    <Menu data-testid='menu-b1' testIds={{ menuItem: 'menu-back' }}>
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
    <Menu data-testid='menu-b' testIds={{ menuItem: 'menu-back' }}>
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
      <div data-testid='spacer' style={{ height: 1 }} />
      <Menu {...props} data-testid='menu'>
        <Menu.Item data-testid='item-a'>Item A</Menu.Item>
        <Menu.Item menu={menuForItemB} data-testid='item-b'>
          Item B
        </Menu.Item>
      </Menu>
    </Container>
  )
}

const component = 'Menu'

describe('Menu', () => {
  it('navigates slide menu', () => {
    cy.mount(<MenuExample />)
    cy.getByTestId('menu-b').should('not.exist')
    cy.getByTestId('menu-back').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'slide-menu',
    })

    cy.getByTestId('item-b').click()
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'slide-menu/after-clicked-item-to-open-sub-menu',
    })

    cy.getByTestId('item-b1').click()
    cy.getByTestId('menu-b1').should('be.visible')
    cy.getByTestId('menu-b2').should('not.exist')
    cy.get('body').click()
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'slide-menu/after-clicked-item-to-open-another-sub-menu',
    })

    cy.getByTestId('menu-back').last().click()
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')
    cy.get('body').click()
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'slide-menu/after-clicked-back-to-prev-sub-menu',
    })

    cy.getByTestId('menu-back').click()
    cy.getByTestId('menu-b').should('not.exist')
    cy.getByTestId('menu-back').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'slide-menu/after-clicked-back-to-original-menu',
    })
  })

  it('navigates drilldown menu', () => {
    cy.mount(<MenuExample variant='drilldown' />)
    cy.getByTestId('spacer').trigger('mouseover')
    cy.getByTestId('menu-b').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/before-mouseover-item',
    })

    cy.getByTestId('item-b').trigger('mouseover')
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')

    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/after-mouseover-item',
    })

    cy.getByTestId('item-b1').trigger('mouseover')
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('be.visible')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/after-mouseover-subitem',
    })

    cy.getByTestId('menu-b1').trigger('mouseout')
    cy.getByTestId('item-b').trigger('mouseover')
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/after-mouseout-subitem',
    })
  })
})
