import React from 'react'
import { Page, Container, Stepper, Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.Header
        variant='light'
        title='Light'
        actionItems={
          <Stepper
            hideLabels
            active={3}
            steps={['', '', '', 'Schedule Matching Call']}
          />
        }
      />
    </Container>

    <Container style={{ position: 'relative', height: '6rem' }}>
      <Page.Header
        variant='dark'
        title='Dark'
        actionItems={
          <Container right='medium'>
            <Button variant='secondary-white'>Create job</Button>
          </Container>
        }
      />
    </Container>
  </div>
)

export default Example
