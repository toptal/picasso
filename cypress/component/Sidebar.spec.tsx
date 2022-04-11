import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import {
  Candidates16,
  Logo,
  Overview16,
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
          <Sidebar.Logo collapseLogo={<Logo emblem />} fullLogo={<Logo />} />
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
          </Sidebar.Menu>
        </Sidebar>
      </div>
    </TestingPicasso>
  )
}

describe('Sidebar', () => {
  describe('when the sidebar is collapsible', () => {
    it('hides and shows the sidebar items text', () => {
      mount(<SidebarExample collapsible />)

      cy.get('[data-testid="collapse-button"]')
        .as('collapseButton')
        .should('not.be.visible')

      cy.get('[data-testid="hover-wrapper"]')
        .as('hoverWrapper')
        .realHover()
        .find('[data-testid="collapse-button"]')
        .realClick()

      cy.get('@collapseButton').should('not.be.visible')
      cy.get('@hoverWrapper').realHover()

      cy.get('body').happoScreenshot()

      cy.get('@hoverWrapper')
        .realHover()
        .find('[data-testid="collapse-button"]')
        .realClick()

      cy.get('body').happoScreenshot()
    })
  })
})
