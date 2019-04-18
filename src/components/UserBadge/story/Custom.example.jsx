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
      <Typography variant='h5'>Worked as</Typography>
      <Container left={0.5}>
        <Typography variant='caption'>UI specialist</Typography>
        <Typography variant='caption'>Painter</Typography>
        <Typography variant='caption'>Student</Typography>
      </Container>
    </UserBadge>
  </div>
)

export default UserBadgeCustomExample
