import React from 'react'
import { Avatar, Container } from '@toptal/picasso'

const person = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  src: './jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque'
}

const generatePeople = (
  count: number
): { alt: string; src: string; name: string }[] => Array(count).fill(person)

const people6 = generatePeople(6)
const people3 = generatePeople(3)

const Example = () => (
  <Container flex direction='column' gap='large'>
    <div>
      Over the Limit
      <Avatar.Group items={people6} />
    </div>
    <div>
      Less than Limit
      <Avatar.Group items={people3} />
    </div>
  </Container>
)

export default Example
