import React from 'react'
import { mount } from '@cypress/react'
import { Container, Typography } from '@toptal/picasso'
import * as icons from '@toptal/picasso/Icon'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('Icon', () => {
  it('renders all icons', () => {
    mount(
      <TestingPicasso>
        <Container
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(213px, 1fr))',
          }}
        >
          {Object.entries(icons).map(([iconName, IconComponent]) => {
            return (
              <Container
                bordered
                padded='small'
                style={{ overflow: 'hidden', textAlign: 'center' }}
              >
                <Typography>{iconName}</Typography>
                <IconComponent color='red' />
              </Container>
            )
          })}
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
