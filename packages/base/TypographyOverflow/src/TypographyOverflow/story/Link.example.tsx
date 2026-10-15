import React from 'react'
import { TypographyOverflow, Link } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow data-testid='ellipsed-text'>
        <Link href='#'>Invoice</Link> a client whose name is long enough to
        overflow
      </TypographyOverflow>
    </div>
  )
}

export default Example
