import React from 'react'
import { UserBadge, Link, Typography } from '@toptal/picasso'

const Example = () => (
  <UserBadge
    name='Jacqueline Roque'
    renderName={name => (
      <Link textDecoration='none' href='#'>
        {name}
      </Link>
    )}
  >
    <Typography size='small'>
      <Link fontSize='inherit' textDecoration='none' href='#'>
        Send me an email
      </Link>
    </Typography>
  </UserBadge>
)

export default Example
