import React from 'react'
import { UserBadge, Typography } from '@toptal/picasso'

const UserBadgeTitleExample = () => (
  <UserBadge
    name='Jacqueline Roque'
    title='UI specialist'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <a href='#'>
      <Typography variant='caption'>Send me an email</Typography>
    </a>
  </UserBadge>
)

export default UserBadgeTitleExample
