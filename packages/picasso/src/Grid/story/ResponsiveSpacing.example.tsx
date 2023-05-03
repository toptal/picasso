import React from 'react'
import { Grid, Container } from '@toptal/picasso'
import { useScreens } from '@toptal/picasso-provider'

const BorderedContainer = () => {
  const screens = useScreens()
  const currentSpacing = screens({
    xs: 'extra-small, 16px spacing',
    sm: 'small, 16px spacing',
    md: 'medium, 24px spacing',
    lg: 'large, 32px spacing',
    xl: 'extra-large, 32px spacing',
  }) as string

  return (
    <Container padded='small' bordered rounded>
      {currentSpacing}
    </Container>
  )
}

const Example = () => {
  return (
    <Grid>
      <Grid.Item small={6}>
        <BorderedContainer />
      </Grid.Item>
      <Grid.Item small={6}>
        <BorderedContainer />
      </Grid.Item>
    </Grid>
  )
}

export default Example
