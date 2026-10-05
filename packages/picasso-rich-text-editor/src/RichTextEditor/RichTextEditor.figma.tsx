import figma from '@figma/code-connect'
import React from 'react'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'

figma.connect(
  RichTextEditor,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12174-37495',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      status: figma.enum('State', {
        Error: 'error',
        'Error Focus': 'error',
      }),
    },
    example: ({ disabled, status }) => (
      <RichTextEditor
        id='rich-text-editor'
        onChange={() => {}}
        disabled={disabled}
        status={status}
      />
    ),
  }
)
