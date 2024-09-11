import React from 'react'
import { Container, Grid, Typography } from '@toptal/picasso'

const LargeContent = () => {
  return (
    <>
      <Container variant='red' padded='xlarge'>
        1
      </Container>
      <Container variant='red' padded='xlarge'>
        2
      </Container>
      <Container variant='red' padded='xlarge'>
        3
      </Container>
      <Container variant='red' padded='xlarge'>
        4
      </Container>
      <Container variant='red' padded='xlarge'>
        5
      </Container>
      <Container variant='red' padded='xlarge'>
        6
      </Container>
      <Container variant='red' padded='xlarge'>
        7
      </Container>
    </>
  )
}

const Example = () => (
  <Grid>
    <Grid.Item sm={6} style={{ overflow: 'hidden' }}>
      <Typography variant='heading' size='medium'>
        Default (nowrap)
      </Typography>

      <Container top='small' flex gap='xlarge'>
        <LargeContent />
      </Container>
    </Grid.Item>
    <Grid.Item sm={6} style={{ overflow: 'hidden' }}>
      <Typography variant='heading' size='medium'>
        Explicit nowrap
      </Typography>

      <Container top='small' flex gap='xlarge' wrap='nowrap'>
        <LargeContent />
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Typography variant='heading' size='medium'>
        Wrap
      </Typography>
      <Container top='small' flex gap='xlarge' wrap='wrap'>
        <LargeContent />
      </Container>
    </Grid.Item>
    <Grid.Item sm={6}>
      <Typography variant='heading' size='medium'>
        Wrap (reverse)
      </Typography>

      <Container top='small' flex gap='xlarge' wrap='wrap-reverse'>
        <LargeContent />
      </Container>
    </Grid.Item>
  </Grid>
)

export default Example
