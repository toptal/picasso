import React from 'react'
import { UserBadge, Typography, Avatar, Container } from '@toptal/picasso'

const UserBadgeCustomExample = () => (
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
      <Typography variant='header' size='small'>
        Worked as
      </Typography>
      <Container left='xsmall'>
        <Typography size='small'>UI specialist</Typography>
        <Typography size='small'>Painter</Typography>
        <Typography size='small'>Student</Typography>
      </Container>
    </UserBadge>
  </div>
)

export default UserBadgeCustomExample
