import React from 'react'
import { Container, Grid, Paper } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={6}>
      <Container align='left'>
        <Paper>Text align left</Paper>
      </Container>
    </Grid.Item>
    <Grid.Item small={6}>
      <Container align='center'>
        <Paper>Text align center</Paper>
      </Container>
    </Grid.Item>
    <Grid.Item small={6}>
      <Container align='right'>
        <Paper>Text align right</Paper>
      </Container>
    </Grid.Item>
    <Grid.Item small={6}>
      <Container align='justify'>
        <Paper>Text align justify</Paper>
      </Container>
    </Grid.Item>
  </Grid>
)

export default Example
