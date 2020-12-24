import React from 'react'
import { UserBadge, Link, Typography } from '@toptal/picasso'

const Example = () => (
  <UserBadge
    name='Jacqueline Roque'
    renderName={name => <Link href='#'>{name}</Link>}
  >
    <Typography size='small'>
      <Link href='#'>Send me an email</Link>
    </Typography>
  </UserBadge>
)

export default Example
