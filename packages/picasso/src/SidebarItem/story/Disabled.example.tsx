import React from 'react'
import { Sidebar } from '@toptal/picasso'
import { Referrals16, Overview16 } from '@toptal/picasso/Icon'

const Example = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<Overview16 />} disabled>
        Overview
      </Sidebar.Item>
      <Sidebar.Item
        collapsible
        disabled
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
    </Sidebar.Menu>
  </Sidebar>
)

export default Example
