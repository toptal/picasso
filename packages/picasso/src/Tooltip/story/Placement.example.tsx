import React from 'react'
import { Tooltip, Button, Container, Grid } from '@toptal/picasso'

const Example = () => (
  <Container style={{ padding: 100, width: 600 }}>
    <Container>
      <Grid direction='row'>
        <Grid.Item small={4}>
          <Tooltip placement='top-start' content='Content' open>
            <Button fullWidth>top-start</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4}>
          <Tooltip placement='top' content='Content' open>
            <Button fullWidth>top</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4}>
          <Tooltip placement='top-end' content='Content' open>
            <Button fullWidth>top-end</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom='small'>
      <Grid direction='row'>
        <Grid.Item small={4}>
          <Tooltip placement='left-start' content='Content' open>
            <Button fullWidth>left-start</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4} />
        <Grid.Item small={4}>
          <Tooltip placement='right-start' content='Content' open>
            <Button fullWidth>right-start</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom='small'>
      <Grid direction='row'>
        <Grid.Item small={4}>
          <Tooltip placement='left' content='Content' open>
            <Button fullWidth>left</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4} />
        <Grid.Item small={4}>
          <Tooltip placement='right' content='Content' open>
            <Button fullWidth>right</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom='small'>
      <Grid direction='row'>
        <Grid.Item small={4}>
          <Tooltip placement='left-end' content='Content' open>
            <Button fullWidth>left-end</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4} />
        <Grid.Item small={4}>
          <Tooltip placement='right-end' content='Content' open>
            <Button fullWidth>right-end</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom='small'>
      <Grid direction='row'>
        <Grid.Item small={4}>
          <Tooltip placement='bottom-start' content='Content' open>
            <Button fullWidth>bottom-start</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4}>
          <Tooltip placement='bottom' content='Content' open>
            <Button fullWidth>bottom</Button>
          </Tooltip>
        </Grid.Item>
        <Grid.Item small={4}>
          <Tooltip placement='bottom-end' content='Content' open>
            <Button fullWidth>bottom-end</Button>
          </Tooltip>
        </Grid.Item>
      </Grid>
    </Container>
  </Container>
)

export default Example
