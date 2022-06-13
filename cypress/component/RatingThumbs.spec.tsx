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

const screenshot = () => cy.get('body').happoScreenshot()

describe('Rating.Thumbs', () => {
  describe('when using different values', () => {
    for (const value of [true, false, undefined]) {
      it(`renders the correct thumb as active if any [value: ${value}]`, () => {
        cy.mount(renderRatingThumbs({ value }))

        screenshot()
      })
    }
  })

  describe('when using different sizes', () => {
    for (const size of ['small', 'large'] as const) {
      it(`renders the correct size thumb [size: ${size}]`, () => {
        cy.mount(renderRatingThumbs({ size }))

        screenshot()
      })
    }
  })
})
