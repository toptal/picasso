import React from 'react'
import { Sidebar, Logo, Container } from '@toptal/picasso'
import {
  Jobs16,
  Overview16,
  Candidates16,
  Team16,
  Participants16,
  Billing16
} from '@toptal/picasso/Icon'

// Replace with `import { Link } from 'react-router-dom'`
const Link = ({ to, children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a href={to} {...rest}>
    {children}
  </a>
)

const SidebarDefaultExample = () => (
  <div>
    <Sidebar>
      <Container bottom='small' left='medium'>
        <Logo variant='white' />
      </Container>
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
  </div>
)

export default SidebarDefaultExample
