import React from 'react'
import { Container, Button, Bell16, Page, Menu } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page hamburgerId='hamburger-center-example'>
      <Page.TopBar
        variant='grey'
        title='Onboarding'
        centerContent={
          <Page.TopBar.Menu>
            <Page.TopBar.Item>Item 1</Page.TopBar.Item>
            <Page.TopBar.Item>Item 2</Page.TopBar.Item>
            <Page.TopBar.Item>Item 3</Page.TopBar.Item>
          </Page.TopBar.Menu>
        }
        actionItems={
          <Container right={SPACING_6}>
            <Button.Circular variant='transparent' icon={<Bell16 />} />
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
    </Page>
  </div>
)

export default Example
