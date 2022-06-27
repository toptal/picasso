import React from 'react'
import { Container } from '@toptal/picasso'

const component = 'Container'

describe('Container', () => {
  it('renders white and transparent variants with grey background', () => {
    cy.mount(
      <div style={{ padding: '1.5rem', backgroundColor: 'grey' }}>
        <Container padded='medium' bottom='small' top='small' variant='white'>
          White variant
        </Container>
        <Container
          padded='medium'
          bottom='small'
          top='small'
          variant='transparent'
        >
          Transparent variant
        </Container>
      </div>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'white-and-transparent/with-grey-background',
    })
  })

  it('renders white and transparent variants with borders', () => {
    cy.mount(
      <div style={{ padding: '1.5rem' }}>
        <Container
          padded='medium'
          bottom='small'
          top='small'
          variant='white'
          bordered
        >
          White variant
        </Container>
        <Container
          padded='medium'
          bottom='small'
          top='small'
          variant='transparent'
          bordered
        >
          Transparent variant
        </Container>
      </div>
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'white-and-transparent/with-borders',
    })
  })
})
