import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationPositionExample = () => {
  const { showInfo } = useNotifications({
    horizontal: 'left',
    vertical: 'top'
  })

  return (
    <Button
      variant='flat'
      onClick={() => showInfo('Left top corner notification message')}
    >
      Show error left top corner
    </Button>
  )
}

export default NotificationPositionExample
