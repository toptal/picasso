import React from 'react'
import { List } from '@toptal/picasso-lab'
import { Container } from '@toptal/picasso'

const DefaultExample = () => (
  <Container bottom='medium'>
    <List variant='ordered'>
      <List.Item>Add at least 10 skills</List.Item>
      <List.Item>Set your age</List.Item>
    </List>
  </Container>
)

export default DefaultExample
