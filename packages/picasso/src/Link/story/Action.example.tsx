import React from 'react'
import { Link, Typography } from '@toptal/picasso'

const ActionLinkExample = () => {
  const handleClick = () => {
    window.alert('Action is invoked!')
  }

  return (
    <Typography size='medium'>
      <Link variant='action' onClick={handleClick}>
        This is an action link!
      </Link>
    </Typography>
  )
}

export default ActionLinkExample
