import React from 'react'
import { Link } from '@toptal/picasso'

const DisabledLinkExample = () => (
  <div>
    <Link
      onClick={() => {
        console.log('foobar')
      }}
      disabled
    >
      Link
    </Link>
  </div>
)

export default DisabledLinkExample
