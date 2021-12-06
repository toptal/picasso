import React from 'react'
import { mount } from '@cypress/react'
import { Container, ContainerProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const TestContainer = (props: ContainerProps) => (
  <Container {...props}>{props.children}</Container>
)

describe('Container', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <TestContainer>Some text</TestContainer>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
