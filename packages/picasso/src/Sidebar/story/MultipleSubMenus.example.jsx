import React from 'react'
import { Sidebar, Logo } from '@toptal/picasso'

const SidebarIconlessExample = () => (
  <Sidebar>
    <Sidebar.Logo>
      <Logo />
    </Sidebar.Logo>
    <Sidebar.Menu>
      <Sidebar.Item>Overview</Sidebar.Item>
      <Sidebar.Item>Jobs</Sidebar.Item>
      <Sidebar.Item
        test-id='Resources'
        collapsible
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
        Resources
      </Sidebar.Item>
      <Sidebar.Item
        collapsible
        menu={
          <Sidebar.Menu>
            <Sidebar.Item selected>Community Leader</Sidebar.Item>
            <Sidebar.Item>Speakers Network</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Get Involved
      </Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

export default SidebarIconlessExample
