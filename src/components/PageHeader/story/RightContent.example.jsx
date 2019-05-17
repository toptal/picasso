import React from 'react'
import { Page, Select, Container, Button } from '@toptal/picasso'

const PageHeaderRightContentExample = () => (
  <div style={{ height: '3.75em' }}>
    <Page.Header rightContent={<RightContent />} title='Onboarding' />
  </div>
)

const RightContent = () => (
  <React.Fragment>
    <Container right='medium'>
      <Button variant='secondary-white'>Create job</Button>
    </Container>
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
  </React.Fragment>
)

const OPTIONS = [
  { value: '1', text: 'My Account' },
  { value: '2', text: 'Log Out' }
]

export default PageHeaderRightContentExample
