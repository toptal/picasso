import React from 'react'
import { Page, Container, Menu, Typography } from '@toptal/picasso'
import { Globe16, Profile16, PortfolioDesigner16 } from '@toptal/picasso/Icon'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.TopBar
        rightContent={<RightContent />}
        centerContent={<CenterContent />}
        title='Default example'
      />
      <Page.Content>
        <SidebarMenu />
        <Page.Article>
          <Content />
        </Page.Article>
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item selected icon={<PortfolioDesigner16 />}>
        Home
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
)

const CenterContent = () => (
  <Page.TopBar.Menu>
    <Page.TopBar.Item icon={<Globe16 />}>Foo</Page.TopBar.Item>
    <Page.TopBar.Item icon={<Profile16 />}>Bar</Page.TopBar.Item>
  </Page.TopBar.Menu>
)

const RightContent = () => (
  <Page.TopBarMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

const Content = () => (
  <Container top='small' bottom='small'>
    <Container bottom='small'>
      <Typography align='center' variant='heading' size='large'>
        Default example
      </Typography>
    </Container>
    <Typography>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Typography>
  </Container>
)

export default Example
