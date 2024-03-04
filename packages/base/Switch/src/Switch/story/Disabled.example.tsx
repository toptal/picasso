import React from 'react'
import { Switch, Container } from '@toptal/picasso'

const Example = () => (
  <Container
    flex
    direction='column'
    style={{ height: 80 }}
    justifyContent='space-between'
  >
    <Switch disabled label='Unchecked' />
    <Switch checked disabled label='Checked' />
    <Switch disabled />
  </Container>
)

export default Example
