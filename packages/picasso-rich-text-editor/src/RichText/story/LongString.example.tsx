import React from 'react'
import { RichText } from '@toptal/picasso-rich-text-editor'

import type { ASTType } from '../types'

const ast: ASTType = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [
        { type: 'text', value: 'Example for line breaks when long string' },
      ],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value:
            'PicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichTextPicassoRichText',
        },
        { type: 'text', value: ' 💪' },
      ],
    },
  ],
}

const style = { maxWidth: '500px' }

const Example = () => {
  return <RichText style={style} value={ast} />
}

export default Example
