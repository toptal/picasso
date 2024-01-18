import React from 'react'
import { Page, Menu, Container, Button, Tag } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.TopBar
      rightContent={<RightContent />}
      actionItems={
        <Container right={SPACING_6}>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      title='Onboarding'
    />
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.TopBarMenu
    name='Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'
    meta={<Tag>Extra content</Tag>}
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.TopBarMenu>
)

export default Example
