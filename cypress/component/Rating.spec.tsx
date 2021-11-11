import React from 'react'
import { mount } from '@cypress/react'
import {
  Container,
  Pin16,
  PinSolid16,
  Rating,
  RatingProps
} from '@toptal/picasso'
import RatingIcon from '@toptal/picasso/RatingIcon'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const defaultProps: RatingProps = {
  name: 'rating',
  value: 1,
  size: 'small'
}

const renderRating = (props = defaultProps) => (
  <TestingPicasso>
    <Container padded='small'>
      <Rating {...props} />
    </Container>
  </TestingPicasso>
)

describe('Rating', () => {
  it('renders default rating', () => {
    mount(renderRating())

    cy.get('body').happoScreenshot()
  })
  it('renders rating hover', () => {
    mount(
      renderRating({
        ...defaultProps,
        renderItem: value => (
          <RatingIcon
            active={value === defaultProps.value}
            interactive
            size='small'
            hovered={value === defaultProps.value}
          />
        )
      })
    )

    cy.get('body').happoScreenshot()
  })
  it('renders large rating', () => {
    mount(renderRating({ ...defaultProps, size: 'large' }))

    cy.get('body').happoScreenshot()
  })
  it('renders large rating hover', () => {
    const size = 'large'

    mount(
      renderRating({
        ...defaultProps,
        size,
        renderItem: value => (
          <RatingIcon
            active={value === defaultProps.value}
            interactive
            size={size}
            hovered={value === defaultProps.value}
          />
        )
      })
    )

    cy.get('body').happoScreenshot()
  })
  it('renders inactive rating', () => {
    mount(renderRating({ ...defaultProps, interactive: false }))

    cy.get('body').happoScreenshot()
  })
  it('renders custom icon rating', () => {
    const customValue = 3

    mount(
      renderRating({
        ...defaultProps,
        value: customValue,
        renderItem: value => (value <= customValue ? <PinSolid16 /> : <Pin16 />)
      })
    )

    cy.get('body').happoScreenshot()
  })
})
