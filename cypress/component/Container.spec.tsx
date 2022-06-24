import React from 'react'
import { Container } from '@toptal/picasso'
import { VariantType } from '@toptal/picasso/src/Container/styles'

const colors: VariantType[] = [
  'transparent',
  'red',
  'green',
  'white',
  'yellow',
  'blue',
  'grey',
]

const borderableColors: VariantType[] = ['white', 'transparent']

const renderColorVariants = () =>
  colors.map(color => (
    <Container
      padded='medium'
      bottom='small'
      top='small'
      variant={color}
      key={color}
    >
      {color} variant
    </Container>
  ))

const component = 'Container'

describe('Container', () => {
  it('renders', () => {
    cy.mount(<Container>Some text</Container>)
    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  describe('colored variants', () => {
    it('renders all variants', () => {
      cy.mount(<>{renderColorVariants()}</>)
      cy.get('body').happoScreenshot({
        component,
        variant: 'all-colors',
      })
    })

    it('renders all variants with grey background', () => {
      cy.mount(
        <div style={{ backgroundColor: 'grey' }}>{renderColorVariants()}</div>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'all-colors/with-grey-background',
      })
    })
  })

  it('renders white and transparent variants with borders', () => {
    cy.mount(
      <>
        {borderableColors.map(color => (
          <Container
            padded='medium'
            bottom='small'
            top='small'
            variant={color}
            key={color}
            bordered
          >
            {color} variant
          </Container>
        ))}
      </>
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'white-and-transparent/with-borders',
    })
  })
})
