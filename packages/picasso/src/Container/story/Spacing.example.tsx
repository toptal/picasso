import React from 'react'
import { Container, Paper, Grid } from '@toptal/picasso'
import {
  SPACING_4,
  SPACING_2,
  SPACING_6,
  SPACING_8,
} from '@toptal/picasso/utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>Outer spacing</Container>
    <Grid>
      <Grid.Item>
        <Container
          top={SPACING_2}
          bottom={SPACING_2}
          left={SPACING_2}
          right={SPACING_2}
        >
          <Paper>
            <span>xsmall</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container
          top={SPACING_4}
          bottom={SPACING_4}
          left={SPACING_4}
          right={SPACING_4}
        >
          <Paper>
            <span>small</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container
          top={SPACING_6}
          bottom={SPACING_6}
          left={SPACING_6}
          right={SPACING_6}
        >
          <Paper>
            <span>medium</span>
          </Paper>
        </Container>
      </Grid.Item>
      <Grid.Item>
        <Container
          top={SPACING_8}
          bottom={SPACING_8}
          left={SPACING_8}
          right={SPACING_8}
        >
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

    <Container bottom={SPACING_4}>Inner spacing</Container>
    <Grid>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_2}>
            <span>xsmall</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_4}>
            <span>small</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_6}>
            <span>medium</span>
          </Container>
        </Paper>
      </Grid.Item>
      <Grid.Item>
        <Paper>
          <Container padded={SPACING_8}>
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
