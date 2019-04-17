import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const UserBadgeSizesExample = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
        >
          <Typography variant='caption'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
      <Grid.Item>
        <UserBadge
          name='Jacqueline Roque'
          avatar='./jacqueline-with-flowers-1954-square.jpg'
          size='small'
        >
          <Typography variant='caption'>UI specialist</Typography>
        </UserBadge>
      </Grid.Item>
    </Grid>
  </div>
)

export default UserBadgeSizesExample
