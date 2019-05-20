import React from 'react'
import {
  Page,
  Container,
  Dropdown,
  Menu,
  UserBadge,
  Typography
} from '@toptal/picasso'

const PageDefaultExample = () => (
  <div style={{ height: '30rem' }}>
    <Page>
      <Page.Header rightContent={<RightContent />} title='Default example' />
      <Page.Content>
        <Content />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Dropdown
    content={
      <Menu style={{ width: '15rem' }}>
        <Menu.Item onClick={handleClick}>My Account</Menu.Item>
        <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
      </Menu>
    }
    offset={{ top: 'xsmall' }}
  >
    <UserBadge
      name='Jacqueline Roque'
      avatar='./jacqueline-with-flowers-1954-square.jpg'
      invert
    />
    <Dropdown.Arrow style={{ color: 'white' }} />
  </Dropdown>
)

const Content = () => (
  <Container top='small' bottom='small' left='small' right='small'>
    <Typography align='center' variant='header' size='large'>
      Default example
    </Typography>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Container>
)

export default PageDefaultExample
