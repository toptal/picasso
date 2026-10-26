import React from 'react'
import { Page, Referrals16 } from '@toptal/picasso'

import {
  INSET_FOCUS_RING,
  WHITE_INSET_FOCUS_RING,
  toHaveStyle,
  toMatchFocusVisible,
} from '../support/focus'

const component = 'SidebarItem'

const VARIANTS = ['light', 'dark'] as const

const SelectedItemSidebar = ({
  variant,
}: {
  variant: (typeof VARIANTS)[number]
}) => (
  <>
    <button>Before</button>
    <Page.Sidebar variant={variant}>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item selected testIds={{ header: 'selected-item' }}>
          Selected
        </Page.Sidebar.Item>
        <Page.Sidebar.Item>Other</Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  </>
)

const CollapsibleSidebar = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item
        testIds={{ header: 'collapsible-menu-item' }}
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item testIds={{ header: 'submenu-item-1' }}>
              Submenu Item 1
            </Page.Sidebar.Item>
            <Page.Sidebar.Item>Submenu Item 2</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Collapsible Menu
      </Page.Sidebar.Item>
      <Page.Sidebar.Item>Non-collapsible Menu</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

describe('SidebarItem', () => {
  describe('when collapsible', () => {
    it('opens the closed submenu correctly', () => {
      cy.mount(<CollapsibleSidebar />)

      cy.getByTestId('submenu-item-1').should('not.be.visible')
      cy.getByTestId('collapsible-menu-item').realClick()
      cy.getByTestId('submenu-item-1').should('be.visible')
      cy.get('body').happoScreenshot({
        component,
        variant: 'after-menu-collapsed',
      })
    })
  })

  describe('when a selected item is focused', () => {
    VARIANTS.forEach(variant => {
      it(`shows inset focus ring on keyboard focus in ${variant} variant`, () => {
        cy.mount(<SelectedItemSidebar variant={variant} />)

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
      cy.mount(<SelectedItemSidebar variant='light' />)

      cy.getByTestId('selected-item').realClick()

      cy.getByTestId('selected-item')
        .should('have.focus')
        .and(toMatchFocusVisible(false))
        .and(toHaveStyle('boxShadow', INSET_FOCUS_RING, { expected: false }))
    })
  })
})
