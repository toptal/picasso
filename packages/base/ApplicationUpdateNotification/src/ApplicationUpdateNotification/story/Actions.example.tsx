import React from 'react'
import { ApplicationUpdateNotification, Button } from '@toptal/picasso'

const Example = () => (
  <ApplicationUpdateNotification
    actions={() => (
      <ApplicationUpdateNotification.Actions>
        <Button
          key='btn-update-now'
          variant='secondary'
          onClick={() => console.log('Update Now')}
        >
          Update Now
        </Button>
      </ApplicationUpdateNotification.Actions>
    )}
  />
)

export default Example
