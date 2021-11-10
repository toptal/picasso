import { mount } from '@cypress/react'
import { Rating, RatingProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import React from 'react'

const defaultProps: RatingProps = {
  name: 'rating'
}

const renderRating = (props = defaultProps) => (
  <TestingPicasso>
    <Rating {...props} />
  </TestingPicasso>
)

describe('Rating', () => {
  it('renders', () => {
    mount(renderRating())

    cy.get('body').happoScreenshot()
  })
})
