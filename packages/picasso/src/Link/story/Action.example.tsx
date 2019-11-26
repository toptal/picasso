import React from 'react'
import { Link } from '@toptal/picasso'

const ActionLinkExample = () => {
  const handleClick = () => {
    window.alert('Action is invoked!')
  }

  return (
    <div>
      <Link variant='action' onClick={handleClick}>
        This is an action link!
      </Link>
    </div>
  )
}

export default ActionLinkExample
