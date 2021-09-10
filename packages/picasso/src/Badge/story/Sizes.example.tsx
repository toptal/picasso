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
        <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
          <Badge content={1} variant='white' size='small' />
          <Badge content={7} variant='white' size='small' />
          <Badge content={25} variant='white' size='small' />
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
          <Badge content={1} variant='red' size='small' />
          <Badge content={7} variant='red' size='small' />
          <Badge content={25} variant='red' size='small' />
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
        <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
          <Badge content={1} variant='white' size='medium' />
          <Badge content={7} variant='white' size='medium' />
          <Badge content={25} variant='white' size='medium' />
          <Badge content={99} variant='white' size='medium' />
          <Badge content={200} variant='white' size='medium' />
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
          <Badge content={1} variant='red' size='medium' />
          <Badge content={7} variant='red' size='medium' />
          <Badge content={25} variant='red' size='medium' />
          <Badge content={99} variant='red' size='medium' />
          <Badge content={200} variant='red' size='medium' />
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
        <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
          <Badge content={1} variant='white' size='large' />
          <Badge content={7} variant='white' size='large' />
          <Badge content={25} variant='white' size='large' />
          <Badge content={99} variant='white' size='large' />
          <Badge content={200} variant='white' size='large' />
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
          <Badge content={1} variant='red' size='large' />
          <Badge content={7} variant='red' size='large' />
          <Badge content={25} variant='red' size='large' />
          <Badge content={99} variant='red' size='large' />
          <Badge content={200} variant='red' size='large' />
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
        <Container top='small' flex style={{ gap: '1rem' }} alignItems='center'>
          <Badge content={9999} variant='white' size='small' max={50} />
          <Badge content={9999} variant='white' size='medium' max={999} />
          <Badge content={9999} variant='white' size='large' max={999} />
        </Container>
      </Grid.Item>
      <Grid.Item small={3}>
        <Container top='small' flex style={{ gap: '1rem' }} alignItems='center'>
          <Badge content={9999} variant='red' size='small' max={50} />
          <Badge content={9999} variant='red' size='medium' max={999} />
          <Badge content={9999} variant='red' size='large' max={999} />
        </Container>
      </Grid.Item>
    </Grid>
  </>
)

export default Example
