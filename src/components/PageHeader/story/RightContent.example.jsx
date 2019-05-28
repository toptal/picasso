import React from 'react'
import { Page, Menu, Container, Button } from '@toptal/picasso'

const PageHeaderRightContentExample = () => (
  <div style={{ height: '3.75em' }}>
    <Page.Header rightContent={<RightContent />} title='Onboarding' />
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <React.Fragment>
    <Container right='medium'>
      <Button variant='secondary-white'>Create job</Button>
    </Container>
    <Page.HeaderMenu
      name='Jacqueline Roque'
      avatar='./jacqueline-with-flowers-1954-square.jpg'
    >
      <Menu style={{ width: '15rem' }}>
        <Menu.Item onClick={handleClick}>My Account</Menu.Item>
        <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
      </Menu>
    </Page.HeaderMenu>
  </React.Fragment>
)

export default PageHeaderRightContentExample
