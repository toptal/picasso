import React from 'react'
import { Page } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso-icons'

const Example = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item
        test-id='Referrals'
        collapsible
        icon={<Referrals16 />}
        menu={
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item>Share Online</Page.Sidebar.Item>
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

export default Example
