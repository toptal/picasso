import React from 'react'
import { Container, Typography, Badge, Grid } from '@toptal/picasso'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        Small:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex>
          <Container padded='small'>
            <Badge content={1} variant='white' size='small' />
          </Container>
          <Container padded='small'>
            <Badge content={7} variant='white' size='small' />
          </Container>
          <Container padded='small'>
            <Badge content={25} variant='white' size='small' />
          </Container>
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex>
          <Container padded='small'>
            <Badge content={1} variant='red' size='small' />
          </Container>
          <Container padded='small'>
            <Badge content={7} variant='red' size='small' />
          </Container>
          <Container padded='small'>
            <Badge content={25} variant='red' size='small' />
          </Container>
        </Container>
      </Grid.Item>
    </Grid>

    <Container>
      <Typography variant='heading' size='small'>
        Medium:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex>
          <Container padded='small'>
            <Badge content={1} variant='white' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={7} variant='white' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={25} variant='white' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={99} variant='white' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={200} variant='white' size='medium' />
          </Container>
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex>
          <Container padded='small'>
            <Badge content={1} variant='red' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={7} variant='red' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={25} variant='red' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={99} variant='red' size='medium' />
          </Container>
          <Container padded='small'>
            <Badge content={200} variant='red' size='medium' />
          </Container>
        </Container>
      </Grid.Item>
    </Grid>

    <Container>
      <Typography variant='heading' size='small'>
        Large:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex>
          <Container padded='small'>
            <Badge content={1} variant='white' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={7} variant='white' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={25} variant='white' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={99} variant='white' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={200} variant='white' size='large' />
          </Container>
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex>
          <Container padded='small'>
            <Badge content={1} variant='red' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={7} variant='red' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={25} variant='red' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={99} variant='red' size='large' />
          </Container>
          <Container padded='small'>
            <Badge content={200} variant='red' size='large' />
          </Container>
        </Container>
      </Grid.Item>
    </Grid>
    <Container>
      <Typography variant='heading' size='small'>
        Custom max count:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item small={3}>
        <Container top='small' flex alignItems='center'>
          <Container padded='small'>
            <Badge content={9999} variant='white' size='small' max={50} />
          </Container>
          <Container padded='small'>
            <Badge content={9999} variant='white' size='medium' max={999} />
          </Container>
          <Container padded='small'>
            <Badge content={9999} variant='white' size='large' max={999} />
          </Container>
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' flex alignItems='center'>
          <Container padded='small'>
            <Badge content={9999} variant='red' size='small' max={50} />
          </Container>
          <Container padded='small'>
            <Badge content={9999} variant='red' size='medium' max={999} />
          </Container>
          <Container padded='small'>
            <Badge content={9999} variant='red' size='large' max={999} />
          </Container>
        </Container>
      </Grid.Item>
    </Grid>
  </>
)

export default Example
