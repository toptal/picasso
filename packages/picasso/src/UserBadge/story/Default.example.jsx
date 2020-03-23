import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Typography size='small'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <UserBadge name='Jacqueline Roque' />
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
