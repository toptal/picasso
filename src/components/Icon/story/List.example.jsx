import React from 'react'
import { Grid, Paper, Typography } from '@toptal/picasso'
import * as icons from '@toptal/picasso/Icons'

const IconListExample = () => (
  <div>
    <Grid spacing={16}>
      {Object.keys(icons).map(iconName => {
        const Icon = icons[iconName]

        return (
          <Grid.Item key={iconName}>
            <Paper>
              <div style={{ padding: '1rem', paddingBottom: '0.5rem' }}>
                <Grid alignItems='center' direction='column' spacing={8}>
                  <Grid.Item>
                    <Icon size={1.5} />
                  </Grid.Item>
                  <Grid.Item>
                    <Typography variant='caption'>{iconName}</Typography>
                  </Grid.Item>
                </Grid>
              </div>
            </Paper>
          </Grid.Item>
        )
      })}
    </Grid>
  </div>
)

export default IconListExample
