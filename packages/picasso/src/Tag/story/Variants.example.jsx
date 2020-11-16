import React from 'react'
import { Container, Tag, Settings16 } from '@toptal/picasso'

const Example = () => (
  <Container flex>
    <Container right='small' top={0.5}>
      <Tag icon={<Settings16 />} variant='grey'>
        Grey
      </Tag>
    </Container>

    <Container right='small' top={0.5}>
      <Tag icon={<Settings16 />} variant='blue'>
        Blue
      </Tag>
    </Container>

    <Container right='small' top={0.5}>
      <Tag variant='green'>Green</Tag>
    </Container>

    <Container right='small' top={0.5}>
      <Tag variant='yellow'>Yellow</Tag>
    </Container>

    <Container top={0.5}>
      <Tag variant='red'>Red</Tag>
    </Container>
  </Container>
)

export default Example
