import React from 'react'
import { Page, Menu } from '@toptal/picasso'

const Example = () => (
  <Page hamburgerId='hamburger-default-example'>
    <Page.TopBar
      variant='grey'
      centerContent={
        <Page.TopBar.Menu>
          <Page.TopBar.Item selected>Item 1</Page.TopBar.Item>
          <Page.TopBar.Item>Item 2</Page.TopBar.Item>
          <Page.TopBar.Item>Item 3</Page.TopBar.Item>
          <Page.TopBar.Item>Item 4</Page.TopBar.Item>
          <Page.TopBar.Item>Item 5</Page.TopBar.Item>
          <Page.TopBar.Item>Item 6</Page.TopBar.Item>
          {/* This won't be rendered. Maximum of 6 items is allowed */}
          <Page.TopBar.Item>Item 7</Page.TopBar.Item>
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
