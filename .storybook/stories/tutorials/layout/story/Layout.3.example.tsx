import React from 'react'
import { Page, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso/utils'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso-icons'

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Container top={SPACING_6} bottom={SPACING_6}>
            Main Content
          </Container>
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
