import React from 'react'
import { Avatar, Container, Typography } from '@toptal/picasso'

const person = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  src: './jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque'
}

const generatePeople = (
  count: number
): { alt: string; src: string; name: string }[] =>
  [...Array(count)].map(() => person)

const Example = () => (
  <Container flex direction='column' gap='large'>
    <div>
      <Typography variant='heading' size='medium'>
        Over the Limit
      </Typography>
      <Avatar.Group items={generatePeople(6)} />
    </div>
    <div>
      <Typography variant='heading' size='medium'>
        On the Limit
      </Typography>
      <Avatar.Group items={generatePeople(5)} />
    </div>
    <div>
      <Typography variant='heading' size='medium'>
        Less than Limit
      </Typography>
      <Avatar.Group items={generatePeople(3)} />
    </div>
  </Container>
)

export default Example
