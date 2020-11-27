import React from 'react'
import { Page, Container, Sidebar } from '@toptal/picasso'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso/Icon'

const SidebarMenu = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Sidebar.Item>
      <Sidebar.Item icon={<Profile16 />}>Contacts</Sidebar.Item>
      <Sidebar.Item icon={<Globe16 />}>Team</Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <Container padded='small'>Main Content</Container>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
