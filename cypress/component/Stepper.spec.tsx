import React from 'react'
import { mount } from '@cypress/react'
import { Stepper, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const Example = props => (
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

  it('renders full width', () => {
    mount(
      <TestingPicasso>
        <div style={{ width: '40rem' }}>
          <Stepper fullWidth steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
        </div>
      </TestingPicasso>
    )

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
})
