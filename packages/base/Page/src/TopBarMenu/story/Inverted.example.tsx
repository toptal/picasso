import React from 'react'
import { Page, Menu, Container, Button } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Page hamburgerId='hamburger-default-example'>
    <Page.TopBar
      variant='light'
      actionItems={
        <Container right={SPACING_6}>
          <Button variant='primary'>Create job</Button>
        </Container>
      }
      rightContent={
        <Page.TopBarMenu
          invert
          name='Jacqueline Roque'
          meta='Developer'
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
