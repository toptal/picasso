import React from 'react'
import { Avatar, Container, Typography, Badge } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>

    <Container top={SPACING_4} flex bottom={SPACING_6} gap={SPACING_4}>
      <Badge content={1} variant='white' size='small'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
      <Badge content={1} variant='white' size='medium'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
      <Badge content={1} variant='white' size='large'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
    </Container>

    <Container>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>

    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Badge content={100} variant='red' size='small'>
        <Avatar name='Adam Jones' />
      </Badge>
      <Badge content={100} variant='red' size='medium'>
        <Avatar name='Adam Jones' />
      </Badge>
      <Badge content={100} variant='red' size='large'>
        <Avatar name='Adam Jones' />
      </Badge>
    </Container>
  </>
)

export default Example
