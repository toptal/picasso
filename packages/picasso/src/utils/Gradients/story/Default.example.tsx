import React from 'react'
import { gradients, shadows } from '@toptal/picasso/utils'
import { Typography, Grid, Container } from '@toptal/picasso'

const Example = () => (
  <Grid>
    {Object.entries(gradients).map(([gradientKey, gradientValue]) => (
      <Grid.Item small={6} key={gradientKey}>
        <Container>
          <Typography size='large'>
            {gradientKey}
          </Typography>
        </Container>
        <Container>
          <ColorRectangle gradient={gradientValue}/>
        </Container>
      </Grid.Item>
    ))}
  </Grid>
)

const ColorRectangle = ({ gradient }: { gradient: string }) => (
  <div
    style={{
      height: '14rem',
      background: gradient,
      boxShadow: shadows[5]
    }}
  />
)

export default Example
