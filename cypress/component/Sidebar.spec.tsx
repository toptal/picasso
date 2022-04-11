import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import {
  Candidates16,
  Help16,
  Logo,
  Overview16,
  ReferralBonus16,
  Sidebar,
  SidebarProps
} from '@toptal/picasso'

const SidebarExample = (props: SidebarProps) => {
  const { collapsible } = props

  return (
    <TestingPicasso>
      <div
        style={{
          height: '58rem',
          maxHeight: '58rem',
          overflowY: 'scroll'
        }}
      >
        <Sidebar
          collapsible={collapsible}
          testIds={{
            hoverWrapper: 'hover-wrapper',
            collapseButton: 'collapse-button',
            container: 'container'
          }}
        >
          <Sidebar.Logo>
            <Logo />
          </Sidebar.Logo>
          <Sidebar.Menu>
            <Sidebar.Item
              icon={<Overview16 data-testid='sidebar-item-icon' />}
              selected
            >
              <span data-testid='sidebar-item-text-content'>Overview</span>
            </Sidebar.Item>
          </Sidebar.Menu>

          <Sidebar.Menu bottom>
            <Sidebar.Item icon={<Candidates16 />}>Opportunities</Sidebar.Item>
            <Sidebar.Item icon={<ReferralBonus16 />}>
              Referral Bonus
            </Sidebar.Item>
            <Sidebar.Item icon={<Help16 />}>Help</Sidebar.Item>
          </Sidebar.Menu>
        </Sidebar>
      </div>
    </TestingPicasso>
  )
}

describe('Sidebar', () => {
  it('renders sidebar menus and items', () => {
    mount(<SidebarExample />)

    cy.get('body').happoScreenshot()
  })

  describe('when sidebar is collapsible and collapsed', () => {
    it('renders sidebar menus and items as collapsed', () => {
      mount(<SidebarExample collapsible defaultCollapsed />)

      cy.get('body').happoScreenshot()
    })
  })

  describe('when sidebar is collapsible and collapsed button clicked', () => {
    it('shrinks the sidebar and hides text contents of the sidebar items', () => {
      mount(<SidebarExample collapsible />)

      // check if both icon and text content visible before collapsing
      cy.get('[data-testid="sidebar-item-icon"]')
        .as('sidebarItemIcon')
        .should('be.visible')
      cy.get('[data-testid="sidebar-item-text-content"]')
        .as('sidebarItemTextContent')
        .should('be.visible')

      cy.get('[data-testid="hover-wrapper"]').realHover()
      cy.get('[data-testid="collapse-button"]')
        .as('collapseButton')
        .should('be.visible')

      cy.get('@collapseButton').realClick()

      // check text content hidden after collapsing while icon visible
      cy.get('@sidebarItemIcon').should('be.visible')
      cy.get('@sidebarItemTextContent').should('not.be.visible')
    })
  })
})
