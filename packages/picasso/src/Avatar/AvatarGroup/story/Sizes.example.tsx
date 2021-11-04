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
      xxsmall
      <Avatar.Group items={people} size='xxsmall' />
    </div>
    <div>
      xsmall
      <Avatar.Group items={people} size='xsmall' />
    </div>
    <div>
      small
      <Avatar.Group items={people} size='small' />
    </div>
    <div>
      medium
      <Avatar.Group items={people} size='medium' />
    </div>
    <div>
      large
      <Avatar.Group items={people} size='large' />
    </div>
  </Container>
)

export default Example
