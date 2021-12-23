import React from 'react'
import { mount } from '@cypress/react'
import { Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { VariantType } from '@toptal/picasso/src/Container/styles'

const colors: VariantType[] = [
  'transparent',
  'red',
  'green',
  'white',
  'yellow',
  'blue',
  'grey'
]

const borderableColors: VariantType[] = ['white', 'transparent']

describe('Container', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <Container>Some text</Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })

  describe('colored variants', () => {
    it('renders all variants', () => {
      mount(
        <TestingPicasso>
          {colors.map(color => (
            <Container
              padded='medium'
              bottom='small'
              top='small'
              variant={color}
              key={color}
            >
              {color} variant
            </Container>
          ))}
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders all variants with grey background', () => {
      mount(
        <TestingPicasso>
          <div style={{ backgroundColor: 'grey' }}>
            {colors.map(color => (
              <Container
                padded='medium'
                bottom='small'
                top='small'
                variant={color}
                key={color}
              >
                {color} variant
              </Container>
            ))}
          </div>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })

  it('renders white and transparent variants with borders', () => {
    mount(
      <TestingPicasso>
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
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
})
