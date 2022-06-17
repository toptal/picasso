import React from 'react'
import { Page, Referrals16 } from '@toptal/picasso'

const component = 'SidebarItem'

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

describe('CollapsibleSidebar', () => {
  it('opens the closed submenu correctly', () => {
    cy.mount(<CollapsibleSidebar />)

    cy.getByTestId('submenu-item-1').should('not.be.visible')
    cy.getByTestId('collapsible-menu-item').realClick()
    cy.getByTestId('submenu-item-1').should('be.visible')
    cy.get('body').happoScreenshot({ component, variant: 'after-menu-collapsed'})
  })
})
