import React from 'react'
import {
  Container,
  Button,
  Bell16,
  Page,
  Menu,
  Overview16,
  Jobs16,
} from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '12rem' }}>
    <Page hamburgerId='hamburger-light-sidebar-example'>
      <Page.TopBar
        variant='light'
        title='Onboarding'
        actionItems={
          <Container right={SPACING_6}>
            <Button.Circular variant='flat' icon={<Bell16 />} />
          </Container>
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
      <Page.Content>
        <Page.Sidebar>
          <Page.Sidebar.Menu>
            <Page.Sidebar.Item icon={<Overview16 />} selected>
              Overview
            </Page.Sidebar.Item>
            <Page.Sidebar.Item icon={<Jobs16 />}>Jobs</Page.Sidebar.Item>
          </Page.Sidebar.Menu>
        </Page.Sidebar>
        <Page.Article />
      </Page.Content>
    </Page>
  </div>
)

export default Example
