import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const person = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  src: './jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque'
}

const photolessPerson = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  name: 'Jacqueline Roque'
}

const namelessPerson = {}

const people = [
  person,
  photolessPerson,
  namelessPerson,
  person,
  person,
  person,
  person,
  person,
  person
]

const Example = () => (
  <Container flex direction='column' gap='large'>
    <div>
      square
      <Avatar.Group items={people} variant='square' />
    </div>
    <div>
      portrait
      <Avatar.Group items={people} variant='portrait' />
    </div>
    <div>
      landscape
      <Avatar.Group items={people} variant='landscape' />
    </div>
  </Container>
)

export default Example
