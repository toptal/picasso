import React from 'react'
import {
  Page,
  Menu,
  PortfolioDesigner16,
  Profile16,
  Globe16,
  Referral16,
  Award16,
  Box16,
} from '@toptal/picasso'

const Example = () => (
  <Page hamburgerId='hamburger-withicons-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item icon={<PortfolioDesigner16 />}>
            Item 1
          </Page.TopBar.Item>
          <Page.TopBar.Item icon={<Profile16 />}>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Globe16 />}>Item 3</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Award16 />}>Item 4</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Referral16 />}>Item 5</Page.TopBar.Item>
          <Page.TopBar.Item icon={<Box16 />}>Item 6</Page.TopBar.Item>
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
  </Page>
)

export default Example
