import React from 'react'
import { Sidebar, Logo, Typography } from '@toptal/picasso'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const RootRouterComponent = ({
  history: {
    location: { pathname }
  }
}) => {
  const ForcedToRerenderComponent = () => {
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
              menu={
                <Sidebar.Menu>
                  {[
                    'Share Online',
                    'Referred Users',
                    'Commissions',
                    'Payment Options',
                    'Expected Commissions'
                  ].map(title => {
                    const slug = '/l2-' + title.toLowerCase().replace(' ', '-')

                    return (
                      <Sidebar.Item
                        key={slug}
                        as={Link}
                        to={slug}
                        selected={slug === pathname}
                      >
                        {title}
                      </Sidebar.Item>
                    )
                  })}
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

  return <ForcedToRerenderComponent />
}

const SidebarDefaultExpanded = () => (
  <Router>
    <Route path='/*' component={RootRouterComponent} />
  </Router>
)

export default SidebarDefaultExpanded
