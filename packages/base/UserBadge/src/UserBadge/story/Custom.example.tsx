import React from 'react'
import { UserBadge, Typography, Avatar, Container } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <UserBadge
      name='Jacqueline Roque'
      avatar={
        <Avatar
          size='large'
          variant='portrait'
          name='Jacqueline Roque'
          src='./jacqueline-with-flowers-1954-square.jpg'
        />
      }
    >
      <Typography variant='body' size='xsmall'>
        Worked as
      </Typography>
      <Container left={SPACING_2}>
        <Typography size='xsmall'>UI specialist</Typography>
        <Typography size='xsmall'>Painter</Typography>
        <Typography size='xsmall'>Student</Typography>
      </Container>
    </UserBadge>
  </div>
)

export default Example
