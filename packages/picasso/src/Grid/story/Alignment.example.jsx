import React from 'react'
import { Grid, Button } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid justifyContent='flex-start'>
      <Grid.Item>
        <Button>Left</Button>
      </Grid.Item>
    </Grid>

    <Grid justifyContent='center'>
      <Grid.Item>
        <Button>Center</Button>
      </Grid.Item>
    </Grid>

    <Grid justifyContent='flex-end'>
      <Grid.Item>
        <Button>Right</Button>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
