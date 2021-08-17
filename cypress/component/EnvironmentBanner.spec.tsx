import React from 'react'
import { mount } from '@cypress/react'
import { EnvironmentBanner, Typography, Container } from '@toptal/picasso'
import styled from 'styled-components'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const Wrapper = styled(Container)`
  height: 2rem;
  position: relative;
`

const Example = () => (
  <div>
    <Wrapper>
      <Typography variant='heading' size='small'>
        Development
      </Typography>
    </Wrapper>
    <Wrapper>
      <EnvironmentBanner environment='development' productName='Picasso' />
    </Wrapper>
    <Wrapper>
      <Typography variant='heading' size='small'>
        Temploy
      </Typography>
    </Wrapper>
    <Wrapper>
      <EnvironmentBanner environment='temploy' productName='Picasso' />
    </Wrapper>
    <Wrapper>
      <Typography variant='heading' size='small'>
        Staging
      </Typography>
    </Wrapper>
    <Wrapper>
      <EnvironmentBanner environment='staging' productName='Picasso' />
    </Wrapper>
    <Wrapper>
      <Typography variant='heading' size='small'>
        Production (should be empty)
      </Typography>
    </Wrapper>
    <Wrapper>
      <EnvironmentBanner environment='production' productName='Picasso' />
    </Wrapper>
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
