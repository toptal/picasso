import React from 'react'
import styled from 'styled-components'
import { Page, Container, Typography, Sidebar } from '@toptal/picasso'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso/Icon'
import { palette } from '@toptal/picasso/utils'

const RightSidebar = styled(Container)`
  border-left: 1px solid ${palette.grey.lighter};
  min-width: 200px;
  flex: 0;
`

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Content />
        </Page.Article>
        <SidebarTips />
      </Page.Content>
    </Page>
  </div>
)

const SidebarMenu = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Sidebar.Item>
      <Sidebar.Item icon={<Profile16 />}>Contacts</Sidebar.Item>
      <Sidebar.Item icon={<Globe16 />}>Team</Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

const SidebarTips = () => (
  <RightSidebar>
    <Container top='small' bottom='small' left='small' right='small'>
      <Typography variant='heading' size='small'>
        Some Tips
      </Typography>
      <Container top='small'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Container>
    </Container>
  </RightSidebar>
)

const Content = () => (
  <Container top='small' bottom='small'>
    <Typography align='center' variant='heading' size='large'>
      Default example
    </Typography>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Container>
)

export default Example
