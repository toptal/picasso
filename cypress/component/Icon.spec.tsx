import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import * as icons from '@toptal/picasso-icons'

const component = 'Icon'

describe('Icon', () => {
  it('renders all icons', () => {
    cy.mount(
      <Container flex style={{ flexWrap: 'wrap' }}>
        {Object.entries(icons).map(([iconName, IconComponent]) => {
          if (iconName.includes('Responsive')) {
            return null
          }

          return (
            <Container
              bordered
              padded='small'
              style={{
                overflow: 'hidden',
                textAlign: 'center',
                width: 213,
                height: 80,
              }}
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
