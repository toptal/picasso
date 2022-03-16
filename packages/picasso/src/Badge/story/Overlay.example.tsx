import React from 'react'
import { Avatar, Container, Typography, Badge } from '@toptal/picasso'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>
    <Container top='small' bottom='medium'>
      <Container inline right='small'>
        <Badge content={1} variant='white' size='small'>
          <Avatar name='Jacqueline Roque' />
        </Badge>
      </Container>
      <Container inline right='small'>
        <Badge content={1} variant='white'>
          <Avatar name='Jacqueline Roque' />
        </Badge>
      </Container>
      <Container inline right='small'>
        <Badge content={1} variant='white' size='large'>
          <Avatar name='Jacqueline Roque' />
        </Badge>
      </Container>
    </Container>
    <Container>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>
    <Container top='small'>
      <Container inline right='small'>
        <Badge content={100} variant='red' size='small'>
          <Avatar name='Adam Jones' />
        </Badge>
      </Container>
      <Container inline right='small'>
        <Badge content={100} variant='red'>
          <Avatar name='Adam Jones' />
        </Badge>
      </Container>
      <Container inline right='small'>
        <Badge content={100} variant='red' size='large'>
          <Avatar name='Adam Jones' />
        </Badge>
      </Container>
    </Container>
  </>
)

export default Example
