import React from 'react'
import { Page, Menu, Container, Button } from '@toptal/picasso'

const Example = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.Header
      actionItems={
        <Container right='medium'>
          <Button variant='transparent'>Create job</Button>
        </Container>
      }
      rightContent={<RightContent />}
      title='Onboarding'
    />
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.HeaderMenu
    name='Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'
    meta='Picasso Picasso Picasso Picasso Picasso Picasso'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.HeaderMenu>
)

export default Example
