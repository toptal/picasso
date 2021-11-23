import React from 'react'
import { Link, Typography } from '@toptal/picasso'

const DisabledLinkExample = () => (
  <Typography size='medium'>
    <Link
      onClick={() => {
        console.log('foobar')
      }}
      disabled
    >
      Link
    </Link>
  </Typography>
)

export default DisabledLinkExample
