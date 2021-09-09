import React from 'react'
import { Container, Typography, Badge } from '@toptal/picasso'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        Small:
      </Typography>
    </Container>
    <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
      <Badge content={1} variant='red' size='small' />
      <Badge content={7} variant='red' size='small' />
      <Badge content={25} variant='red' size='small' />
    </Container>

    <Container>
      <Typography variant='heading' size='small'>
        Medium:
      </Typography>
    </Container>
    <Container top='small' bottom='medium' flex style={{ gap: '1rem' }}>
      <Badge content={1} variant='red' size='medium' />
      <Badge content={7} variant='red' size='medium' />
      <Badge content={25} variant='red' size='medium' />
      <Badge content={99} variant='red' size='medium' />
      <Badge content={200} variant='red' size='medium' />
    </Container>

    <Container>
      <Typography variant='heading' size='small'>
        Large:
      </Typography>
    </Container>
    <Container top='small' flex style={{ gap: '1rem' }}>
      <Badge content={1} variant='red' size='large' />
      <Badge content={7} variant='red' size='large' />
      <Badge content={25} variant='red' size='large' />
      <Badge content={99} variant='red' size='large' />
      <Badge content={200} variant='red' size='large' />
    </Container>
  </>
)

export default Example
