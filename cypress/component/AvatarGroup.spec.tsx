import React from 'react'
import { Container, Avatar, AvatarProps } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

type Props = Pick<AvatarProps, 'variant' | 'size'>

const person = {
  src: 'https://picasso.toptal.net/jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque',
  alt: 'Jacqueline Roque, Pablo Picasso, 1954'
}

const generatePeople = (
  count: number
): { alt: string; src: string; name: string }[] =>
  [...Array(count)].map(() => person)

const SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const
const VARIANTS = ['square', 'portrait', 'landscape'] as const

const renderExample = ({ size, variant }: Props) => (
  <TestingPicasso>
    <Container flex direction='column' gap='large'>
      <Avatar.Group size={size} variant={variant} items={generatePeople(5)} />
      <Avatar.Group size={size} variant={variant} items={generatePeople(6)} />
      <Avatar.Group size={size} variant={variant} items={generatePeople(3)} />
    </Container>
  </TestingPicasso>
)

const createSizeTests = (variant: Props['variant']) => {
  describe(`${variant} variant`, () => {
    SIZES.forEach(size =>
      it(`renders in ${size} size`, () => {
        mount(renderExample({ size, variant }))

        cy.get('body').happoScreenshot()
      })
    )
  })
}

describe('Avatar', () => {
  VARIANTS.forEach(variant => createSizeTests(variant))
})
