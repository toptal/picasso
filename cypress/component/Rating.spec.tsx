import React from 'react'
import type { RatingStarsProps } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import { Container, Pin16, PinSolid16, Rating } from '@toptal/picasso'
import RatingIcon from '@toptal/picasso/RatingIcon'

const defaultProps: RatingStarsProps = {
  name: 'rating',
  value: 1,
  size: 'small',
}

const renderRating = (props = defaultProps) => (
  <Container padded={SPACING_4}>
    <Rating.Stars {...props} />
  </Container>
)

const component = 'RatingStars'

describe('Rating.Stars', () => {
  it('renders rating hover', () => {
    cy.mount(
      renderRating({
        ...defaultProps,
        renderItem: value => (
          <RatingIcon
            active={value === defaultProps.value}
            interactive
            size='small'
            hovered={value === defaultProps.value}
          />
        ),
      })
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'interactive/after-hovered',
    })
  })

  it('renders large rating hover', () => {
    const size = 'large'

    cy.mount(
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
        ),
      })
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'interactive-and-size-large/after-hovered',
    })
  })

  it('renders custom icon rating', () => {
    const customValue = 3

    cy.mount(
      renderRating({
        ...defaultProps,
        value: customValue,
        renderItem: value =>
          value <= customValue ? <PinSolid16 /> : <Pin16 />,
      })
    )

    cy.get('body').happoScreenshot({
      component,
      variant: 'custom-icon',
    })
  })
})
