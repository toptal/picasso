import React from 'react'
import { Avatar, Container, Typography } from '@toptal/picasso'

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

const SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large'] as const

const Example = () => (
  <Container flex direction='column' gap='large'>
    {SIZES.map(size => (
      <div key={size}>
        <Typography variant='heading' size='medium'>
          {size}
        </Typography>
        <Avatar.Group items={people} size={size} />
      </div>
    ))}
  </Container>
)

export default Example
