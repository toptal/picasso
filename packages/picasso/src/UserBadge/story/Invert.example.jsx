import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <div style={{ backgroundColor: '#204ecf', padding: '1rem' }}>
          <UserBadge
            name='Jacqueline Roque'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
            invert
          >
            <Typography invert size='small'>
              UI specialist
            </Typography>
          </UserBadge>
        </div>
      </Grid.Item>
      <Grid.Item>
        <div style={{ backgroundColor: '#204ecf', padding: '1rem' }}>
          <UserBadge
            name='Jacqueline Roque'
            avatar='./jacqueline-with-flowers-1954-square.jpg'
            size='small'
            invert
          >
            <Typography invert size='small'>
              UI specialist
            </Typography>
          </UserBadge>
        </div>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
