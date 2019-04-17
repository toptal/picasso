import React from 'react'
import { Grid, Button } from '@toptal/picasso'

const GridAlignmentExample = () => (
  <div>
    <Grid justify='flex-start'>
      <Grid.Item>
        <Button>Left</Button>
      </Grid.Item>
    </Grid>

    <Grid justify='center'>
      <Grid.Item>
        <Button>Center</Button>
      </Grid.Item>
    </Grid>

    <Grid justify='flex-end'>
      <Grid.Item>
        <Button>Right</Button>
      </Grid.Item>
    </Grid>
  </div>
)

export default GridAlignmentExample
