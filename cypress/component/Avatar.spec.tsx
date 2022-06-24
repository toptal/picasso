import React from 'react'
import { Container, Avatar, AvatarProps } from '@toptal/picasso'

type Props = Pick<AvatarProps, 'variant' | 'size' | 'src'>

const name = 'Jacqueline Roque'
const alt = 'Jacqueline Roque, Pablo Picasso, 1954'

const SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const
const VARIANTS = ['square', 'portrait', 'landscape'] as const

const renderExample = ({ size, variant, src }: Props) => (
  <>
    {/* With image */}
    <Container inline>
      <Avatar
        src={`data:image/jpeg;base64,${src}`}
        alt={alt}
        name={name}
        size={size}
        variant={variant}
      />
    </Container>

    {/* With initials */}
    <Container inline left='medium'>
      <Avatar name={name} size={size} variant={variant} />
    </Container>

    {/* With placeholder icon */}
    <Container inline left='medium'>
      <Avatar size={size} variant={variant} />
    </Container>
  </>
)

const component = 'Avatar'

const createSizeTests = (variant: Props['variant']) => {
  describe(`${variant} variant`, () => {
    SIZES.forEach(size =>
      it(`renders in ${size} size`, () => {
        /* eslint-disable max-nested-callbacks */
        /* eslint-disable promise/catch-or-return */
        cy.fixture('pablo.jpg').then(file =>
          cy.mount(renderExample({ size, variant, src: file }))
        )

        cy.get('body').happoScreenshot({
          component,
          variant: `size-variants/${size}`,
        })
      })
    )
  })
}

describe('Avatar', () => {
  VARIANTS.forEach(variant => createSizeTests(variant))
})
