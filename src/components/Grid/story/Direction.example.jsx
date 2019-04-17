import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'

const GridDirectionExample = () => (
  <div>
    <Container bottom={4}>
      <Container bottom={1}>
        <Typography>Row direction</Typography>
      </Container>

      <Grid direction='row'>
        <Grid.Item>
          <Button>Element A</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>Element B</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Container bottom={1}>
      <Typography>Column direction</Typography>
    </Container>

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
