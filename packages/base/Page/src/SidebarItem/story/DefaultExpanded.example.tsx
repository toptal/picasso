import React from 'react'
import { Page } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso/Icon'

const Example = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
            <Page.Sidebar.Item>Referred Users</Page.Sidebar.Item>
            <Page.Sidebar.Item selected>Commissions</Page.Sidebar.Item>
            <Page.Sidebar.Item>Payment Options</Page.Sidebar.Item>
            <Page.Sidebar.Item>Expected Commissions</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        }
      >
        Referrals
      </Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

export default Example
