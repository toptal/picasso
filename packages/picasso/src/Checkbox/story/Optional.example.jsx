import React from 'react'
import { Checkbox, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item large={3}>
      <Checkbox label='I would like to receive newsletters.' required={false} />
    </Grid.Item>
  </Grid>
)

export default Example
