import React from 'react'
import { Grid, Button, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='large'>
      <Container bottom='small'>
        <Typography>Wrap</Typography>
      </Container>
      <Grid wrap='wrap' style={{ maxWidth: '200px' }}>
        <Grid.Item>
          <Button>1</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>2</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>3</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>4</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Container bottom='large'>
      <Container bottom='small'>
        <Typography>Nowrap</Typography>
      </Container>
      <Grid wrap='nowrap' style={{ maxWidth: '200px' }}>
        <Grid.Item>
          <Button>1</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>2</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>3</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>4</Button>
        </Grid.Item>
      </Grid>
    </Container>

    <Container bottom='large'>
      <Container bottom='small'>
        <Typography>Wrap-reverse</Typography>
      </Container>
      <Grid wrap='wrap-reverse' style={{ maxWidth: '200px' }}>
        <Grid.Item>
          <Button>1</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>2</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>3</Button>
        </Grid.Item>
        <Grid.Item>
          <Button>4</Button>
        </Grid.Item>
      </Grid>
    </Container>
  </div>
)

export default Example
