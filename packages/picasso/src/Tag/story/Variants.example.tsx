import React from 'react'
import { Container, Settings16, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='grey'>Grey</Tag>
      <Tag icon={<Settings16 />} variant='grey'>
        Grey
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='blue'>Blue</Tag>
      <Tag icon={<Settings16 />} variant='blue'>
        Blue
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='green'>Green</Tag>
      <Tag icon={<Settings16 />} variant='green'>
        Green
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' right='small' top={0.5}>
      <Tag variant='yellow'>Yelow</Tag>
      <Tag icon={<Settings16 />} variant='yellow'>
        Yelow
      </Tag>
    </Container>

    <Container flex direction='column' gap='1rem' top={0.5}>
      <Tag variant='red'>Red</Tag>
      <Tag icon={<Settings16 />} variant='red'>
        Red
      </Tag>
    </Container>
  </Container>
)

export default Example
