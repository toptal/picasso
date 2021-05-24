import React from 'react'
import { List, Container } from '@toptal/picasso'

const DefaultExample = () => (
  <Container bottom='medium'>
    <List variant='ordered' start={5}>
      <List.Item>Add at least 10 skills</List.Item>
      <List.Item>Set your age</List.Item>
    </List>
  </Container>
)

export default DefaultExample
