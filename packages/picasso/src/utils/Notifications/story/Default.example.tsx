import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const Example = () => {
  const { showInfo } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showInfo("That's one small step for a man, one giant leap for mankind.")
      }
    >
      Show general notification
    </Button>
  )
}

export default Example
