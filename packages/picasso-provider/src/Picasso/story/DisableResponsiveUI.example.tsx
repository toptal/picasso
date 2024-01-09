import React from 'react'
// In actual application you can simply do
// import Picasso from '@toptal/picasso-provider'
import { default as Picasso } from '@toptal/picasso-provider'
import { Grid, Page, Container, Menu, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.TopBar rightContent={<RightContent />} title='Default example' />
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
      <Page.Sidebar.Item>Home</Page.Sidebar.Item>
      <Page.Sidebar.Item>Contacts</Page.Sidebar.Item>
      <Page.Sidebar.Item>Team</Page.Sidebar.Item>
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

const Content = () => (
  <Container
    top={SPACING_4}
    bottom={SPACING_4}
    left={SPACING_4}
    right={SPACING_4}
  >
    <Typography align='center' variant='heading' size='large'>
      Default example
    </Typography>
    <Grid>
      <Grid.Item sm={6}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Grid.Item>
      <Grid.Item sm={6}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Grid.Item>
    </Grid>
  </Container>
)

const Index = () => (
  <div id='root'>
    <Picasso
      responsive={false}
      loadFavicon={false}
      fixViewport={false}
      preventPageWidthChangeOnScrollbar={false}
    >
      <Example />
    </Picasso>
  </div>
)

export default Index
