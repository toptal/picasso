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

const VARIANTS = ['square', 'portrait', 'landscape'] as const

const Example = () => (
  <Container flex direction='column' gap='large'>
    {VARIANTS.map(variant => (
      <div key={variant}>
        <Typography variant='heading' size='medium'>
          {variant}
        </Typography>
        <Avatar.Group items={people} variant={variant} />
      </div>
    ))}
  </Container>
)

export default Example
