import React from 'react'
import { Grid, Button } from '@toptal/picasso'

const GridDefaultExample = () => (
  <div>
    <Grid>
      <Grid.Item small={12}>
        <Button fullWidth>width = 12</Button>
      </Grid.Item>

      <Grid.Item small={6}>
        <Button fullWidth>width = 6</Button>
      </Grid.Item>
      <Grid.Item small={6}>
        <Button fullWidth>width = 6</Button>
      </Grid.Item>

      <Grid.Item small={3}>
        <Button fullWidth>width = 3</Button>
      </Grid.Item>
      <Grid.Item small={3}>
        <Button fullWidth>width = 3</Button>
      </Grid.Item>
      <Grid.Item small={3}>
        <Button fullWidth>width = 3</Button>
      </Grid.Item>
      <Grid.Item small={3}>
        <Button fullWidth>width = 3</Button>
      </Grid.Item>
    </Grid>
  </div>
)

export default GridDefaultExample
