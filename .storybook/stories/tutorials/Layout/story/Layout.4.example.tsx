import React from 'react'
import { Page, PageHead, Sidebar } from '@toptal/picasso'
import { Globe16, PortfolioDesigner16, Profile16 } from '@toptal/picasso/Icon'
import { Section } from '@toptal/picasso-lab'

const SidebarMenu = () => (
  <Sidebar>
    <Sidebar.Menu>
      <Sidebar.Item icon={<PortfolioDesigner16 />}>Home</Sidebar.Item>
      <Sidebar.Item icon={<Profile16 />}>Contacts</Sidebar.Item>
      <Sidebar.Item icon={<Globe16 />}>Team</Sidebar.Item>
    </Sidebar.Menu>
  </Sidebar>
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
