import React from 'react'
import { mount } from '@cypress/react'
import { Container, ContainerProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { VariantType } from '@toptal/picasso/src/Container'

const colors: VariantType[] = [
  'red',
  'green',
  'white',
  'yellow',
  'blue',
  'grey'
]

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

  describe('colored variants', () => {
    it('renders all variants', () => {
      mount(
        <TestingPicasso>
          {colors.map(color => (
            <TestContainer
              padded='medium'
              bottom='small'
              top='small'
              variant={color}
              key={color}
            >
              {color} variant
            </TestContainer>
          ))}
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders all variants with bordered prop', () => {
      mount(
        <TestingPicasso>
          {colors.map(color => (
            <TestContainer
              bordered
              padded='medium'
              bottom='small'
              top='small'
              variant={color}
              data-testid={`${color}-container`}
              key={color}
            >
              {color} variant
            </TestContainer>
          ))}
        </TestingPicasso>
      )

      colors.forEach(color => {
        /* eslint-disable cypress/no-assigning-return-values */
        const container = cy.get(`[data-testid="${color}-container"`)

        container.invoke('attr', 'class').should('contain', `${color}Variant`)

        if (color !== 'white') {
          container.should('not.contain', 'bordered')
        } else {
          container.should('contain', 'bordered')
        }
      })
      cy.get('body').happoScreenshot()
    })
  })
})
