import React from 'react'
import { Page, Container, Typography, Dropdown } from '@toptal/picasso'

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

const DropdownContent = ({ handleClose }) => (
  <React.Fragment>
    <Dropdown.Item onClick={handleClose}>My Account</Dropdown.Item>
    <Dropdown.Item onClick={() => window.console.log('Log out clicked')}>
      Log out
    </Dropdown.Item>
  </React.Fragment>
)

const RightContent = () => (
  <Dropdown style={{ color: 'white' }} content={<DropdownContent />}>
    P. Picasso
  </Dropdown>
)

const Content = () => (
  <Container bottom={1} left={1} right={1} top={1}>
    <Typography align='center' variant='h1'>
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
