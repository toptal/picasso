import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='large'>
      <Container bottom='small'>
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

    <Container bottom='small'>
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

export default Example
