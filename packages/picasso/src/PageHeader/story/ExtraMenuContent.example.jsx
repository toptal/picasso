import React from 'react'
import { Page, Menu, Container, Button, Label } from '@toptal/picasso'

const PageHeaderExtraMenuContentExample = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.Header
      rightContent={<RightContent />}
      actionItems={
        <Container right='medium'>
          <Button variant='secondary-white'>Create job</Button>
        </Container>
      }
      title='Onboarding'
    />
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.HeaderMenu
    name='Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'
    meta={<Label>Extra content</Label>}
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.HeaderMenu>
)

export default PageHeaderExtraMenuContentExample
