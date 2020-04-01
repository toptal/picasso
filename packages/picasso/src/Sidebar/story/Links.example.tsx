import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Sidebar, Logo } from '@toptal/picasso'
import {
  Jobs16,
  Overview16,
  Candidates16,
  Team16,
  Participants16,
  Billing16
} from '@toptal/picasso-icons'

const SidebarDefaultExample = () => (
  <BrowserRouter>
    <Sidebar>
      <Sidebar.Logo>
        <Logo />
      </Sidebar.Logo>
      <Sidebar.Menu>
        <Sidebar.Item icon={<Overview16 />} as={Link} to='/#overview' selected>
          Overview
        </Sidebar.Item>
        <Sidebar.Item icon={<Jobs16 />} as={Link} to='/#jobs'>
          Jobs
        </Sidebar.Item>
        <Sidebar.Item icon={<Candidates16 />} as={Link} to='/#candidates'>
          Candidates
        </Sidebar.Item>
        <Sidebar.Item icon={<Team16 />} as={Link} to='/#team'>
          Team
        </Sidebar.Item>
        <Sidebar.Item icon={<Participants16 />} as={Link} to='/#users'>
          Users
        </Sidebar.Item>
        <Sidebar.Item icon={<Billing16 />} as={Link} to='/#billing' disabled>
          Billing
        </Sidebar.Item>
      </Sidebar.Menu>
    </Sidebar>
  </BrowserRouter>
)

export default SidebarDefaultExample
