import React from 'react'
import { Container, Settings16, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='light'>Light</Tag>
      <Tag icon={<Settings16 />} variant='light'>
        Light
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='primary'>Primary</Tag>
      <Tag icon={<Settings16 />} variant='primary'>
        Primary
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='positive'>Positive</Tag>
      <Tag icon={<Settings16 />} variant='positive'>
        Positive
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='warning'>Warning</Tag>
      <Tag icon={<Settings16 />} variant='warning'>
        Warning
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' top={0.5}>
      <Tag variant='negative'>Negative</Tag>
      <Tag icon={<Settings16 />} variant='negative'>
        Negative
      </Tag>
    </Container>
  </Container>
)

export default Example
