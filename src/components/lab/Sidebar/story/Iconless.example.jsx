import React from 'react'
import { Sidebar, Logo, Typography } from '@toptal/picasso'

const SidebarIconlessExample = () => (
  <div
    style={{
      height: '58em',
      maxHeight: '58em',
      overflowY: 'scroll'
    }}
  >
    <Sidebar>
      <Sidebar.Logo>
        <Logo />
      </Sidebar.Logo>
      <Sidebar.Menu>
        <Sidebar.Item selected>Overview</Sidebar.Item>
        <Sidebar.Item>Jobs</Sidebar.Item>
        <Sidebar.Item>Candidates</Sidebar.Item>
        <Sidebar.Item>Team</Sidebar.Item>
        <Sidebar.Item>Users</Sidebar.Item>
        <Sidebar.Item disabled>Billing</Sidebar.Item>
        <Sidebar.Item>
          <Typography size='medium' color='inherit'>
            Legal Info
          </Typography>
        </Sidebar.Item>
        <Sidebar.Item
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
        <Sidebar.Item>Resources</Sidebar.Item>
      </Sidebar.Menu>

      <Sidebar.Menu bottom>
        <Sidebar.Item>Opportunities</Sidebar.Item>
        <Sidebar.Item>Referral Bonus</Sidebar.Item>
        <Sidebar.Item>Help</Sidebar.Item>
      </Sidebar.Menu>
    </Sidebar>
  </div>
)

export default SidebarIconlessExample
