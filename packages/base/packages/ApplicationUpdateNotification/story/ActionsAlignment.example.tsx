import React from 'react'
import { ApplicationUpdateNotification, Button } from '@toptal/picasso'

const Example = () => (
  <ApplicationUpdateNotification
    actions={() => (
      <ApplicationUpdateNotification.Actions justifyContent='flex-end'>
        <Button
          key='btn-update-now'
          variant='secondary'
          onClick={() => console.log('Update Now')}
        >
          Update Now
        </Button>
        <Button
          key='btn-update-later'
          variant='secondary'
          onClick={() => console.log('Update Later')}
        >
          Update Later
        </Button>
      </ApplicationUpdateNotification.Actions>
    )}
  />
)

export default Example
