import React from 'react'
import { Grid, Slider, Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <Grid alignItems='center'>
      <Grid.Item sm={6}>
        <Grid alignItems='center'>
          <Grid.Item>
            <Typography size='medium'>{0}</Typography>
          </Grid.Item>
          <Grid.Item sm>
            <Slider max={100} />
          </Grid.Item>
          <Grid.Item>
            <Typography size='medium'>{100}</Typography>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  )
}

export default Example
