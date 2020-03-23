import React from 'react'
import { Container, Paper, Grid } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>Outer spacing</Container>
    <Grid>
      <Grid.Item>
        <Container top='xsmall' bottom='xsmall' left='xsmall' right='xsmall'>
          <Paper>
            <span>xsmall</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container top='small' bottom='small' left='small' right='small'>
          <Paper>
            <span>small</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container top='medium' bottom='medium' left='medium' right='medium'>
          <Paper>
            <span>medium</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container top='large' bottom='large' left='large' right='large'>
          <Paper>
            <span>large</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container top={5} bottom={5} left={5} right={5}>
          <Paper>
            <span>custom</span>
          </Paper>
        </Container>
      </Grid.Item>
    </Grid>

    <Container bottom='small'>Inner spacing</Container>
    <Grid>
      <Grid.Item>
        <Paper>
          <Container padded='xsmall'>
            <span>xsmall</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded='small'>
            <span>small</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded='medium'>
            <span>medium</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded='large'>
            <span>large</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={5}>
            <span>custom</span>
          </Container>
        </Paper>
      </Grid.Item>
    </Grid>
  </div>
)

export default Example
