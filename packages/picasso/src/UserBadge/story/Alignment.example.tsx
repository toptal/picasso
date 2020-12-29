import React from 'react'
import { UserBadge, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Grid direction='column'>
      <Grid.Item>
        <Typography>Auto</Typography>
        <Grid>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
            />
          </Grid.Item>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
            >
              <Typography size='small'>UI specialist</Typography>
            </UserBadge>
          </Grid.Item>
        </Grid>
      </Grid.Item>
      <Grid.Item>
        <Typography>Centered</Typography>
        <Grid>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center
            />
          </Grid.Item>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center
            >
              <Typography size='small'>UI specialist</Typography>
            </UserBadge>
          </Grid.Item>
        </Grid>
      </Grid.Item>
      <Grid.Item>
        <Typography>Non-centered</Typography>
        <Grid>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center={false}
            />
          </Grid.Item>
          <Grid.Item>
            <UserBadge
              name='Jacqueline Roque'
              avatar='./jacqueline-with-flowers-1954-square.jpg'
              size='small'
              center={false}
            >
              <Typography size='small'>UI specialist</Typography>
            </UserBadge>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
