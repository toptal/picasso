import React from 'react'
import { Grid, Paper, Typography, Container } from '@toptal/picasso'
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
              <Container
                p={1}
                pb={0.5}
                style={{
                  minWidth: '6rem'
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
              </Container>
            </Paper>
          </Grid.Item>
        )
      })}
    </Grid>
  </div>
)

export default IconListExample
