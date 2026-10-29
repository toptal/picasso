import React from 'react'
import type { MenuProps } from '@toptal/picasso'
import { Container, Menu } from '@toptal/picasso'

import {
  INSET_FOCUS_RING,
  WHITE_INSET_FOCUS_RING,
  toHaveStyle,
  toMatchFocusVisible,
} from '../support/focus'

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
      {/* in-flow filler — removing it shifts every baseline by 1px */}
      <div style={{ height: 1 }} />
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

const VARIANTS = ['light', 'dark'] as const

const SelectedItemMenu = ({
  variant,
}: {
  variant: (typeof VARIANTS)[number]
}) => (
  <Container style={{ width: '240px' }}>
    <button>Before</button>
    <Menu>
      <Menu.Item variant={variant} selected data-testid='selected-item'>
        Selected
      </Menu.Item>
      <Menu.Item variant={variant}>Other</Menu.Item>
    </Menu>
  </Container>
)

// deselect via body click, then let the blurred item's transition-colors
// (~150ms) come to rest so the snapshot doesn't freeze a mid-transition color
const clickBodyAndSettle = () => {
  cy.get('body').click()
  cy.waitForTransitionsToSettle('[role="menuitem"]')
}

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
    clickBodyAndSettle()
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'slide-menu/after-clicked-item-to-open-another-sub-menu',
    })

    cy.getByTestId('menu-back').last().click()
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')
    clickBodyAndSettle()
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
    // park the pointer off the menu — drilldown hover is state-driven and
    // would serialize into the capture
    cy.get('body').realHover({ position: 'bottomRight' })
    cy.getByTestId('menu-b').should('not.exist')
    cy.getByTestId('item-a').should(
      'have.css',
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/before-mouseover-item',
    })

    cy.getByTestId('item-b').realHover()
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')
    cy.getByTestId('menu-b2').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/after-mouseover-item',
    })

    cy.getByTestId('item-b1').realHover()
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('be.visible')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/after-mouseover-subitem',
    })

    cy.getByTestId('item-b').realHover()
    cy.getByTestId('menu-b').should('be.visible')
    cy.getByTestId('menu-b1').should('not.exist')
    cy.getByTestId('menu-b2').should('not.exist')
    cy.get('[data-cy-root]').happoScreenshot({
      component,
      variant: 'drilldown/after-mouseout-subitem',
    })
  })

  describe('when a selected item is focused', () => {
    VARIANTS.forEach(variant => {
      it(`shows inset focus ring on keyboard focus in ${variant} variant`, () => {
        cy.mount(<SelectedItemMenu variant={variant} />)

        cy.contains('Before').realClick()
        cy.realPress('Tab')

        cy.getByTestId('selected-item')
          .should('have.focus')
          .and(toMatchFocusVisible(true))
          .and(toHaveStyle('boxShadow', INSET_FOCUS_RING))
          // White on dark, blue on light
          .and(
            toHaveStyle('boxShadow', WHITE_INSET_FOCUS_RING, {
              expected: variant === 'dark',
            })
          )
      })
    })

    it('does not show focus ring on mouse focus', () => {
      cy.mount(<SelectedItemMenu variant='light' />)

      cy.getByTestId('selected-item').realClick()

      cy.getByTestId('selected-item')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', INSET_FOCUS_RING, { expected: false }))
    })
  })
})
