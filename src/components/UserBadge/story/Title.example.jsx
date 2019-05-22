import React from 'react'
import { UserBadge, Link, Typography } from '@toptal/picasso'

const UserBadgeTitleExample = () => (
  <UserBadge
    name='Jacqueline Roque'
    title='UI specialist'
    avatar='./jacqueline-with-flowers-1954-square.jpg'
  >
    <Typography variant='caption'>
      <Link href='#'>Send me an email</Link>
    </Typography>
  </UserBadge>
)

export default UserBadgeTitleExample
