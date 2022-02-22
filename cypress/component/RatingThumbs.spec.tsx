import React from 'react'
import { Container, Rating, RatingThumbsProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { mount } from '@cypress/react'

const defaultProps: RatingThumbsProps = {
  name: 'rating-thumbs'
}

const renderRatingThumbs = (props: Partial<RatingThumbsProps> = {}) => (
  <TestingPicasso>
    <Container padded='small'>
      <Rating.Thumbs {...defaultProps} {...props} />
    </Container>
  </TestingPicasso>
)

const screenshot = () => cy.get('body').happoScreenshot()

describe('Rating', () => {
  describe('when using different values', () => {
    for (const value of [true, false, undefined]) {
      it(`renders the correct thumb as active if any [value: ${value}]`, () => {
        mount(renderRatingThumbs({ value }))

        screenshot()
      })
    }
  })

  describe('when using different sizes', () => {
    for (const size of ['small', 'large'] as const) {
      it(`renders the correct size thumb [size: ${size}]`, () => {
        mount(renderRatingThumbs({ size }))

        screenshot()
      })
    }
  })
})
