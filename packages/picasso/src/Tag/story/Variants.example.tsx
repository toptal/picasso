import React from 'react'
import { Container, Settings16, Tag } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container flex direction='column' gap='small' right='small' top={0.5}>
      <Tag variant='light-grey'>Light grey</Tag>
      <Tag icon={<Settings16 />} variant='light-grey'>
        Light grey
      </Tag>
    </Container>

    <Container flex direction='column' gap='small' right='small' top={0.5}>
      <Tag variant='blue'>Blue</Tag>
      <Tag icon={<Settings16 />} variant='blue'>
        Blue
      </Tag>
    </Container>

    <Container flex direction='column' gap='small' right='small' top={0.5}>
      <Tag variant='green'>Green</Tag>
      <Tag icon={<Settings16 />} variant='green'>
        Green
      </Tag>
    </Container>

    <Container flex direction='column' gap='small' right='small' top={0.5}>
      <Tag variant='yellow'>Yellow</Tag>
      <Tag icon={<Settings16 />} variant='yellow'>
        Yellow
      </Tag>
    </Container>

    <Container flex direction='column' gap='small' top={0.5}>
      <Tag variant='red'>Red</Tag>
      <Tag icon={<Settings16 />} variant='red'>
        Red
      </Tag>
    </Container>
  </Container>
)

export default Example
