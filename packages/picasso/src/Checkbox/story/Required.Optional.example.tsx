import React from 'react'
import { Checkbox, Container, Grid, Typography } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item large={3}>
      <Container bottom={1}>
        <Typography weight='semibold'>Required</Typography>
      </Container>
      <Checkbox label='I confirm that I have legal permission from the client to feature this project.' />
    </Grid.Item>
    <Grid.Item large={3}>
      <Container bottom={1}>
        <Typography weight='semibold'>Optional</Typography>
      </Container>
      <Checkbox
        optional
        label='I confirm that I have legal permission from the client to feature this project.'
      />
    </Grid.Item>
  </Grid>
)

export default Example
