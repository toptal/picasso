import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso/utils'

const component = 'Container'

describe('Container', () => {
  it('renders white and transparent variants with grey background', () => {
    cy.mount(
      <div style={{ padding: '1.5rem', backgroundColor: 'grey' }}>
        <Container
          padded={SPACING_6}
          bottom={SPACING_4}
          top={SPACING_4}
          variant='white'
        >
          White variant
        </Container>
        <Container
          padded={SPACING_6}
          bottom={SPACING_4}
          top={SPACING_4}
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
          padded={SPACING_6}
          bottom={SPACING_4}
          top={SPACING_4}
          variant='white'
          bordered
        >
          White variant
        </Container>
        <Container
          padded={SPACING_6}
          bottom={SPACING_4}
          top={SPACING_4}
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
