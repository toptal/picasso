import React from 'react'
import { Sidebar, Logo, Typography } from '@toptal/picasso'
import { Referrals16 } from '@toptal/picasso/Icon'

const SidebarDefaultExpanded = () => (
  <Sidebar>
    <Sidebar.Logo>
      <Logo />
    </Sidebar.Logo>
    <Sidebar.Menu>
      <Sidebar.Item>Overview</Sidebar.Item>
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
        icon={<Referrals16 />}
        menu={
          <Sidebar.Menu>
            <Sidebar.Item selected>Share Online</Sidebar.Item>
            <Sidebar.Item>Referred Users</Sidebar.Item>
            <Sidebar.Item>Commisions</Sidebar.Item>
            <Sidebar.Item>Payment Options</Sidebar.Item>
            <Sidebar.Item>Expected Commisions</Sidebar.Item>
          </Sidebar.Menu>
        }
      >
        Referrals
      </Sidebar.Item>
      <Sidebar.Item>More Resources</Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

export default SidebarDefaultExpanded
