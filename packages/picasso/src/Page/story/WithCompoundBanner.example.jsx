import React from 'react'
import styled from 'styled-components'
import { Page, Container, Menu, Typography, Link } from '@toptal/picasso'
import { ExclamationSolid16 } from '@toptal/picasso/Icon'
const { Banner } = Page

const StyledMainContentContainer = styled(Container)`
  flex: 1;
`

const Example = () => (
  <div style={{ maxHeight: '30rem' }}>
    <Page>
      <Page.Header rightContent={<RightContent />} title='Default example' />
      <Banner icon={<ExclamationSolid16 color='yellow' />}>
        <Banner.Message>
          You need to sign STA agreement in order to be able to hire talent.
        </Banner.Message>
        <Banner.Actions>
          <Link>Sign STA Agreement</Link>
        </Banner.Actions>
      </Banner>
      <Banner icon={<ExclamationSolid16 color='yellow' />}>
        <Banner.Message>
          It looks like your credit card or ACH payment method is not working.
          Please update your payment information.
        </Banner.Message>
        <Banner.Actions>
          <Link>Update Billing Details</Link>
        </Banner.Actions>
      </Banner>
      <Page.Content>
        <Content />
      </Page.Content>
      <Page.Footer />
    </Page>
  </div>
)

const handleClick = () => window.alert('Item clicked')

const RightContent = () => (
  <Page.HeaderMenu
    name='Jacqueline Roque'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Menu>
      <Menu.Item onClick={handleClick}>My Account</Menu.Item>
      <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
    </Menu>
  </Page.HeaderMenu>
)

const Content = () => (
  <StyledMainContentContainer
    top='small'
    bottom='small'
    left='small'
    right='small'
  >
    <Typography align='center' variant='heading' size='large'>
      With compound banner example
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
  </StyledMainContentContainer>
)

export default Example
