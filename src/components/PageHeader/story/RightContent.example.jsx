import React from 'react'
import {
  Page,
  Dropdown,
  Menu,
  UserBadge,
  Container,
  Button
} from '@toptal/picasso'
import styled from 'styled-components'

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
    <Dropdown
      content={
        <Menu style={{ width: '15rem' }}>
          <Menu.Item onClick={handleClick}>My Account</Menu.Item>
          <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
        </Menu>
      }
      offset={{ top: 'xsmall' }}
    >
      <HeaderUserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Dropdown.Arrow style={{ color: 'white' }} />
    </Dropdown>
  </React.Fragment>
)

const HeaderUserBadge = styled(({ name, avatar, className }) => (
  <UserBadge
    invert
    size='xsmall'
    classes={{ avatar: 'avatar' }}
    className={className}
    name={name}
    avatar={avatar}
  />
))`
  & .avatar {
    font-size: 0.9rem;
  }
`

export default PageHeaderRightContentExample
