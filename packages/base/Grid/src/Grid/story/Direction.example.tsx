import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'
import { SPACING_8, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>
      <Container bottom={SPACING_4}>
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

    <Container bottom={SPACING_4}>
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
