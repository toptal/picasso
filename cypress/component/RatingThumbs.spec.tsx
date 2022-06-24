import React from 'react'
import { Container, Rating, RatingThumbsProps } from '@toptal/picasso'

const defaultProps: RatingThumbsProps = {
  name: 'rating-thumbs',
}

const renderRatingThumbs = (props: Partial<RatingThumbsProps> = {}) => (
  <Container padded='small'>
    <Rating.Thumbs {...defaultProps} {...props} />
  </Container>
)

const component = 'RatingThumbs'

describe('Rating.Thumbs', () => {
  describe('when using different values', () => {
    for (const value of [true, false, undefined]) {
      it(`renders the correct thumb as active if any [value: ${value}]`, () => {
        cy.mount(renderRatingThumbs({ value }))

        cy.get('body').happoScreenshot({
          component,
          variant: 'various-values',
        })
      })
    }
  })

  describe('when using different sizes', () => {
    for (const size of ['small', 'large'] as const) {
      it(`renders the correct size thumb [size: ${size}]`, () => {
        cy.mount(renderRatingThumbs({ size }))

        cy.get('body').happoScreenshot({
          component,
          variant: 'all-sizes',
        })
      })
    }
  })
})
