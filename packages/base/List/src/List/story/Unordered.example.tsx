import React from 'react'
import { List, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const DefaultExample = () => (
  <Container bottom={SPACING_6}>
    <List variant='unordered'>
      <List.Item>Add at least 10 skills</List.Item>
      <List.Item>Set your age</List.Item>
    </List>
  </Container>
)

export default DefaultExample
