import React from 'react'
import { SkeletonLoader } from '@toptal/picasso-lab'
import { Typography, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item small={4}>
      <Typography>One row</Typography>
      <SkeletonLoader />
    </Grid.Item>
    <Grid.Item small={4}>
      <Typography>Two rows</Typography>
      <SkeletonLoader rows={2} />
    </Grid.Item>
    <Grid.Item small={4}>
      <Typography>Three rows</Typography>
      <SkeletonLoader rows={3} />
    </Grid.Item>
  </Grid>
)

export default Example
