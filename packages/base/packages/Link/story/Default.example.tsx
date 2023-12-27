import React from 'react'
import { Link, Typography } from '@toptal/picasso'

const DefaultLinkExample = () => (
  <Typography size='medium'>
    <Link href={window.parent.location.href + '#'}>Link</Link>
  </Typography>
)

export default DefaultLinkExample
