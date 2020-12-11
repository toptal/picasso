import React from 'react'
import { Sidebar } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso/Icon'

const Example = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item
        test-id='Referrals'
        collapsible
        icon={<Referrals16 />}
        menu={
          <Sidebar.Menu>
            <Sidebar.Item>Share Online</Sidebar.Item>
            <Sidebar.Item>Referred Users</Sidebar.Item>
            <Sidebar.Item>Commissions</Sidebar.Item>
            <Sidebar.Item>Payment Options</Sidebar.Item>
            <Sidebar.Item>Expected Commissions</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Referrals
      </Sidebar.Item>
      <Sidebar.Item
        collapsible
        menu={
          <Sidebar.Menu>
            <Sidebar.Item>Community Leader</Sidebar.Item>
            <Sidebar.Item>Speakers Network</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Get Involved
      </Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

export default Example
