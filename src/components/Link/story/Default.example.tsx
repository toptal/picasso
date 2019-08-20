import React from 'react'
import { Link } from '@toptal/picasso'

const DefaultLinkExample = () => (
  <div>
    <Link href={window.parent.location.href + '#'}>Link</Link>
  </div>
)

export default DefaultLinkExample
