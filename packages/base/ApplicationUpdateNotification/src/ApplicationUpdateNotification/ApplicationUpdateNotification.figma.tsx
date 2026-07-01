import figma from '@figma/code-connect'
import React from 'react'
import { ApplicationUpdateNotification, Button } from '@toptal/picasso'

figma.connect(
  ApplicationUpdateNotification,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=13550-12430',
  {
    props: {
      dismissable: figma.enum('Variant', {
        Dismissible: true,
        Persistent: false,
      }),
    },
    example: ({ dismissable }) => (
      <ApplicationUpdateNotification
        dismissable={dismissable}
        onClose={() => {}}
        actions={onClose => (
          <ApplicationUpdateNotification.Actions>
            <Button variant='secondary' size='medium' onClick={onClose}>
              Update
            </Button>
          </ApplicationUpdateNotification.Actions>
        )}
      />
    ),
  }
)
