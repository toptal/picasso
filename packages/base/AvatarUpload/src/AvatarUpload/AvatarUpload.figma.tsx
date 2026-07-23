import figma from '@figma/code-connect'
import React from 'react'
import { AvatarUpload } from '@toptal/picasso'

figma.connect(
  AvatarUpload,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=3886-16524',
  {
    props: {
      size: figma.enum('Size', {
        '80x80': 'small',
        '160x160': 'large',
      }),
      uploading: figma.enum('State', {
        Loading: true,
      }),
      status: figma.enum('State', {
        Error: 'error',
        'Error+Focus': 'error',
      }),
    },
    example: ({ size, uploading, status }) => (
      <AvatarUpload
        size={size}
        uploading={uploading}
        status={status}
        onDropAccepted={() => {}}
      />
    ),
  }
)
