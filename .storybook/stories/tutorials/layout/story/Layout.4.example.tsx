import React from 'react'
import { Page, PageHead } from '@toptal/picasso'
import { Globe16, PortfolioDesigner16, Profile16 } from '@toptal/picasso-icons'
import { Section } from '@toptal/picasso'

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const MainContent = () => (
  <Page.Article>
    <PageHead>
      <PageHead.Main>
        <PageHead.Title>Profile</PageHead.Title>
      </PageHead.Main>
    </PageHead>
    <Section title='Details'>Details content</Section>
    <Section title='Notes'>Notes content</Section>
  </Page.Article>
)

const Example = () => (
  <div style={{ height: '40rem' }}>
    <Page>
      <Page.TopBar title='How to layout a page' />
      <Page.Content>
        <SidebarMenu />
        <MainContent />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

export default Example
