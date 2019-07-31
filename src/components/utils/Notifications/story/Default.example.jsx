import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const DefaultExample = () => {
  const { showInfo } = useNotifications()

  return (
    <Button
      variant='flat'
      onClick={() =>
        showInfo("That's one small step for a man, one giant leap for mankind.")
      }
    >
      Show general notification
    </Button>
  )
}

export default DefaultExample
