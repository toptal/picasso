import React, { useState } from 'react'
import { Button, Container, Logo, Page } from '@toptal/picasso'
import { Candidates16, Home16, Jobs16, Team16 } from '@toptal/picasso-icons'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Container flex style={{ height: '30rem' }}>
      <Page.Sidebar collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Page.Sidebar.Logo
          collapsedLogo={<Logo emblem />}
          fullLogo={<Logo />}
        />
        <Page.Sidebar.Menu>
          <Page.Sidebar.Item icon={<Home16 />} selected>
            Overview
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Candidates16 />}>
            Candidates
          </Page.Sidebar.Item>
          <Page.Sidebar.Item icon={<Team16 />}>Team</Page.Sidebar.Item>
        </Page.Sidebar.Menu>
      </Page.Sidebar>
      <Container left={SPACING_6}>
        <Button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        </Button>
      </Container>
    </Container>
  )
}

export default Example
