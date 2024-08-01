import React from 'react'
import { Container, EnvironmentBanner, Typography } from '@toptal/picasso'

const CONTAINER_HEIGHT = '2rem'

const Example = () => (
  <div>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Development
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner
        environment='development'
        productName='Picasso'
        style={{ width: '100%' }}
      />
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Temploy
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner
        environment='temploy'
        productName='Picasso'
        style={{ width: '100%' }}
      />
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Staging
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner
        environment='staging'
        productName='Picasso'
        style={{ width: '100%' }}
      />
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Production (should be empty)
      </Typography>
    </Container>
  </div>
)

export default Example
