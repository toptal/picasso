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
): { alt: string; src: string; name: string }[] => Array(count).fill(person)

const SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const

const ppl5 = generatePeople(5)
const ppl6 = generatePeople(6)
const ppl3 = generatePeople(3)

const renderExample = ({ size }: Props) => (
  <TestingPicasso>
    <Container flex direction='column' gap='large'>
      <Avatar.Group size={size} items={ppl5} />
      <Avatar.Group size={size} items={ppl6} />
      <Avatar.Group size={size} items={ppl3} />
    </Container>
  </TestingPicasso>
)

describe('AvatarGroup', () => {
  SIZES.forEach(size =>
    // TODO: https://toptal-core.atlassian.net/browse/FX-2274
    it.skip(`renders in ${size} size`, () => {
      mount(renderExample({ size }))

      cy.get('body').happoScreenshot()
    })
  )
})
