import React from 'react'
import { Checkbox, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item large={3}>
      <Checkbox
        label='I confirm that I have legal permission from the client to feature this project.'
        requiredDecoration='asterisk'
      />
    </Grid.Item>
  </Grid>
)

export default Example
