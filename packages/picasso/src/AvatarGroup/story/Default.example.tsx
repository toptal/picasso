import React from 'react'
import { Avatar } from '@toptal/picasso'

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

const Example = () => <Avatar.Group items={people} />

export default Example
