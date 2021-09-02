import React from 'react'
import { mount } from '@cypress/react'
import { Stepper, Container, StepperProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const Example: React.FC<Pick<
  StepperProps,
  'hideLabels',
  'orientation'
>> = props => (
  <TestingPicasso>
    <Container padded='medium'>
      <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} {...props} />
    </Container>
    <Container top='small' padded='medium'>
      <Stepper
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
        {...props}
      />
    </Container>
    <Container top='small' padded='medium'>
      <Stepper
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
        {...props}
      />
    </Container>
    <Container top='small' padded='medium'>
      <Stepper
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
        {...props}
      />
    </Container>
  </TestingPicasso>
)

describe('Stepper', () => {
  it('renders with label', () => {
    mount(<Example />)
    cy.get('body').happoScreenshot()
  })

  it('renders without label', () => {
    mount(
      <TestingPicasso>
        <Example hideLabels />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  it('renders vertically', () => {
    mount(
      <TestingPicasso>
        <Example orientation='vertical' />
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
