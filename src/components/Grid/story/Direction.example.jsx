import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'

const GridDirectionExample = () => (
  <div>
    <Container mb={4}>
      <Typography gutterBottom={1}>Row direction</Typography>

      <Grid direction='row'>
        <Grid.Item>
          <Button>Element A</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>Element B</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Typography gutterBottom={1}>Column direction</Typography>

    <Grid direction='column'>
      <Grid.Item>
        <Button>Element A</Button>
      </Grid.Item>
      <Grid.Item>
        <Button>Element B</Button>
      </Grid.Item>
    </Grid>
  </div>
)

export default GridDirectionExample
