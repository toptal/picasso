import React from 'react'
import { Page, Container, Button, Input, Search16 } from '@toptal/picasso'

const PageHeaderLeftContentExample = () => (
  <div style={{ height: '4.5rem' }}>
    <Page.Header
      actionItems={
        <Container right='medium'>
          <Button variant='secondary-white'>Create job</Button>
        </Container>
      }
      leftContent={<LeftContent />}
      title='Onboarding'
    />
  </div>
)

const LeftContent = () => (
  <Container left='xlarge' style={{ backgroundColor: 'white' }}>
    <Input placeholder='Go to user' icon={<Search16 />} />
  </Container>
)

export default PageHeaderLeftContentExample
