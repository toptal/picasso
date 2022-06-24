import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import * as icons from '@toptal/picasso/Icon'

const component = 'Icon'

describe('Icon', () => {
  it('renders all icons', () => {
    cy.mount(
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
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'all-icons',
    })
  })
})
