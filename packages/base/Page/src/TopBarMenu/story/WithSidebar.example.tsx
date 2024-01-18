import React from 'react'
import {
  Page,
  Menu,
  PortfolioDesigner16,
  Profile16,
  Globe16,
} from '@toptal/picasso'

const Example = () => (
  <Page hamburgerId='hamburger-withsidebar-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item selected icon={<PortfolioDesigner16 />}>
            Item 1
          </Page.TopBar.Item>
          <Page.TopBar.Item icon={<Profile16 />}>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Globe16 />}>Item 3</Page.TopBar.Item>
        </Page.TopBar.Menu>
      }
      rightContent={
        <Page.TopBarMenu
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Menu>
            <Menu.Item>My Account</Menu.Item>
            <Menu.Item>Log Out</Menu.Item>
          </Menu>
        </Page.TopBarMenu>
      }
    />
    <Page.Sidebar>
      <Page.Sidebar.Menu>
        <Page.Sidebar.Item selected icon={<PortfolioDesigner16 />}>
          Home
        </Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
        <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
      </Page.Sidebar.Menu>
    </Page.Sidebar>
  </Page>
)

export default Example
