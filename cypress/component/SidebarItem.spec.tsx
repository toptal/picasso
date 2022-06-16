import React from 'react'
import { Page, Referrals16 } from '@toptal/picasso'

const CollapsibleSidebar = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item
        testIds={{ header: 'referrals' }}
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item testIds={{ header: 'share-online' }}>
              Share Online
            </Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
      <Page.Sidebar.Item
        collapsible
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Community Leader</Page.Sidebar.Item>
            <Page.Sidebar.Item>Speakers Network</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Get Involved
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

describe('CollapsibleSidebar', () => {
  it('opens the closed submenu correctly', () => {
    cy.mount(<CollapsibleSidebar />)

    cy.getByTestId('share-online').should('not.be.visible')
    cy.getByTestId('referrals').realClick()
    cy.getByTestId('share-online').should('be.visible')
    cy.get('body').happoScreenshot()
  })
})
