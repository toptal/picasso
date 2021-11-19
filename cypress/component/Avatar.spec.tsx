import React from 'react'
import { Container, Avatar, AvatarProps } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

type Props = Pick<AvatarProps, 'variant' | 'size'>

const src = 'https://picasso.toptal.net/jacqueline-with-flowers-1954-square.jpg'
const name = 'Jacqueline Roque'
const alt = 'Jacqueline Roque, Pablo Picasso, 1954'

const SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const
const VARIANTS = ['square', 'portrait', 'landscape'] as const

const renderExample = ({ size, variant }: Props) => (
  <TestingPicasso>
    {/* With image */}
    <Container inline>
      <Avatar src={src} alt={alt} name={name} size={size} variant={variant} />
    </Container>

    {/* With initials */}
    <Container inline left='medium'>
      <Avatar name={name} size={size} variant={variant} />
    </Container>

    {/* With placeholder icon */}
    <Container inline left='medium'>
      <Avatar size={size} variant={variant} />
    </Container>
  </TestingPicasso>
)

const createSizeTests = (variant: Props['variant']) => {
  describe(`${variant} variant`, () => {
    SIZES.forEach(size =>
      // TODO: https://toptal-core.atlassian.net/browse/FX-2274
      it.skip(`renders in ${size} size`, () => {
        mount(renderExample({ size, variant }))

        cy.get('body').happoScreenshot()
      })
    )
  })
}

describe('Avatar', () => {
  VARIANTS.forEach(variant => createSizeTests(variant))
})
