import React from 'react'
import { Sidebar, Logo, Typography } from '@toptal/picasso'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const RootRouterComponent = ({
  history: {
    location: { pathname }
  }
}) => {
  const subRoutes = [
    'l2-share-online',
    'l2-referred-users',
    'l2-commissions',
    'l2-payment-options',
    'l2-expected-commissions'
  ]
  const defaultExpanded = subRoutes.includes(pathname.slice(1))

  return (
    <div>
      Current path: {pathname}
      <Sidebar>
        <Sidebar.Logo>
          <Logo />
        </Sidebar.Logo>
        <Sidebar.Menu>
          <Sidebar.Item as={Link} to='/l1-overview'>
            Overview
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/l1-jobs'>
            Jobs
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/l1-candidates'>
            Candidates
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/l1-team'>
            Team
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/l1-users'>
            Users
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/l1-billing' disabled>
            Billing
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/l1-legal-info'>
            <Typography size='medium' color='inherit'>
              Legal Info
            </Typography>
          </Sidebar.Item>
          <Sidebar.Item
            collapsible
            defaultExpanded={defaultExpanded}
            menu={
              <Sidebar.Menu>
                <Sidebar.Item as={Link} to='/l2-share-online' selected>
                  Share Online
                </Sidebar.Item>
                <Sidebar.Item as={Link} to='/l2-referred-users'>
                  Referred Users
                </Sidebar.Item>
                <Sidebar.Item as={Link} to='/l2-commissions'>
                  Commissions
                </Sidebar.Item>
                <Sidebar.Item as={Link} to='/l2-payment-options'>
                  Payment Options
                </Sidebar.Item>
                <Sidebar.Item as={Link} to='/l2-expected-commissions'>
                  Expected Commissions
                </Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Resources
          </Sidebar.Item>
          <Sidebar.Item as={Link} to='/#more-resources'>
            More Resources
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar>
    </div>
  )
}

const SidebarIconlessExample = () => (
  <Router>
    <Route path='/iframe.html' component={RootRouterComponent} />
    <Route path='/l1*' component={RootRouterComponent} />
    <Route path='/l2*' component={RootRouterComponent} />
  </Router>
)

export default SidebarIconlessExample
