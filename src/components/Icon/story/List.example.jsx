import React from 'react'
import { Grid, Paper, Typography } from '@toptal/picasso'
import * as icons from '@toptal/picasso/Icons'

/** We don't want to render internal icons */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Logo, LogoEmblem, ...listIcons } = icons

const IconListExample = () => (
  <div>
    <Grid spacing={16}>
      {Object.keys(listIcons).map(iconName => {
        const Icon = listIcons[iconName]

        return (
          <Grid.Item key={iconName}>
            <Paper>
              <div
                style={{
                  padding: '1rem',
                  paddingBottom: '0.5rem',
                  minWidth: '6rem',
                  height: '5rem'
                }}
              >
                <Grid alignItems='center' direction='column' spacing={8}>
                  <Grid.Item>
                    <Icon size={2} />
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
