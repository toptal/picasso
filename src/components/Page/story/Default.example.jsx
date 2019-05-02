import React from 'react'
import { Page, Container, Select, Typography } from '@toptal/picasso'

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

const RightContent = () => (
  <Select
    options={OPTIONS}
    placeholder='D. Petrashev'
    style={{
      fontSize: '12px',
      color: 'white'
    }}
    variant='standard'
    width='shrink'
  />
)

const OPTIONS = [
  { value: '1', text: 'My Account' },
  { value: '2', text: 'Log Out' }
]

const Content = () => (
  <Container top='small' bottom='small' left='small' right='small'>
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
