import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationPositionExample = () => {
  const { showInformation } = useNotifications({
    horizontal: 'left',
    vertical: 'top'
  })

  return (
    <Button
      variant='flat'
      onClick={() => showInformation('Left top corner notification message')}
    >
      Show error left top corner
    </Button>
  )
}

export default NotificationPositionExample
