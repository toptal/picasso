import React from 'react'
import { mount } from '@cypress/react'
import { EnvironmentBanner, Typography, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const CONTAINER_HEIGHT = '2rem'

const Example = () => (
  <div>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Development
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner environment='development' productName='Picasso' />
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Temploy
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner environment='temploy' productName='Picasso' />
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Staging
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner environment='staging' productName='Picasso' />
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <Typography variant='heading' size='small'>
        Production (should be empty)
      </Typography>
    </Container>
    <Container style={{ position: 'relative', height: CONTAINER_HEIGHT }}>
      <EnvironmentBanner environment='production' productName='Picasso' />
    </Container>
  </div>
)

describe('EnvironmentBanner', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <Example />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
