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

const Example = () => (
  <Container flex direction='column' gap='large'>
    <div>
      Over the Limit
      <Avatar.Group items={generatePeople(6)} />
    </div>
    <div>
      On the Limit
      <Avatar.Group items={generatePeople(5)} />
    </div>
    <div>
      Less than Limit
      <Avatar.Group items={generatePeople(3)} />
    </div>
  </Container>
)

export default Example
