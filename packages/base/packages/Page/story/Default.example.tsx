import React from 'react'
import {
  Page,
  Container,
  Menu,
  Typography,
  Tooltip,
  Button,
  Globe16,
  Profile16,
  Home16,
  HeartbeatResponsive,
} from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.TopBar
        rightContent={<RightContent />}
        actionItems={<ActionItems />}
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

const CenterContent = () => (
  <Page.TopBar.Menu>
    <Page.TopBar.Item>Item 1</Page.TopBar.Item>
    <Page.TopBar.Item>Item 2</Page.TopBar.Item>
    <Page.TopBar.Item>Item 3</Page.TopBar.Item>
  </Page.TopBar.Menu>
)

const SidebarMenu = () => (
  <Page.Sidebar>
    <Page.Sidebar.Menu>
      <Page.Sidebar.Item selected icon={<Home16 />}>
        Home
      </Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Profile16 />}>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item icon={<Globe16 />}>Team</Page.Sidebar.Item>
    </Page.Sidebar.Menu>
  </Page.Sidebar>
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

const ActionItems = () => (
  <Tooltip content='Your Operational Issues'>
    <Button.Circular
      variant='transparent'
      responsive
      icon={<HeartbeatResponsive color='light-grey' />}
      data-testid='operational-issues-button'
      onClick={() => {}}
    />
  </Tooltip>
)

const Content = () => (
  <Container top={SPACING_4} bottom={SPACING_4}>
    <Container bottom={SPACING_4}>
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
