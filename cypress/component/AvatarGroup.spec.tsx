import React from 'react'
import { Container, Avatar } from '@toptal/picasso'

const generatePeople = (
  count: number,
  person: { name: string; alt: string; src: string }
): { alt: string; src: string; name: string }[] => Array(count).fill(person)

const SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const

describe('AvatarGroup', () => {
  SIZES.forEach(size =>
    it(`renders in ${size} size`, () => {
      /* eslint-disable max-nested-callbacks */
      /* eslint-disable promise/catch-or-return */
      cy.fixture('pablo.jpg').then(file => {
        const person = {
          name: 'Jacqueline Roque',
          alt: 'Jacqueline Roque, Pablo Picasso, 1954',
          src: `data:image/jpeg;base64,${file}`,
        }

        return cy.mount(
          <Container flex direction='column' gap='large'>
            <Avatar.Group size={size} items={generatePeople(5, person)} />
            <Avatar.Group size={size} items={generatePeople(6, person)} />
            <Avatar.Group size={size} items={generatePeople(3, person)} />
          </Container>
        )
      })

      cy.get('body').happoScreenshot()
    })
  )
})
