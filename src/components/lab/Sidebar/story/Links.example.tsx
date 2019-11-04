import React from 'react'
import { Router, Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Sidebar, Logo } from '@toptal/picasso'
import {
  Jobs16,
  Overview16,
  Candidates16,
  Team16,
  Participants16,
  Billing16
} from '@toptal/picasso/Icon'

const SidebarDefaultExample = () => (
  <Router history={customHistory}>
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
  </Router>
)

const customHistory = createBrowserHistory()

export default SidebarDefaultExample
