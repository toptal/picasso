import { mount } from '@cypress/react'
import { Rating, RatingProps } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import React from 'react'

const defaultProps: RatingProps = {
  name: 'rating',
  value: 1,
  size: 'small'
}

const renderRating = (props = defaultProps) => (
  <TestingPicasso>
    <Rating {...props} />
  </TestingPicasso>
)

describe('Rating', () => {
  it('renders default rating', () => {
    mount(renderRating())

    cy.get('body').happoScreenshot()
  })
  it('renders large rating', () => {
    mount(renderRating({ ...defaultProps, size: 'large' }))

    cy.get('body').happoScreenshot()
  })
  it('renders hover rating', () => {
    mount(renderRating())

    cy.get('[data-testid="rating-1"]').invoke('attr', 'class', 'hovered')

    cy.get('body').happoScreenshot()
  })
})
