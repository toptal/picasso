import React from 'react'
import { FormNonCompound, RichTextEditor } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso-utils'
import type { ASTType } from '@toptal/picasso-rich-text-editor'

const ast: ASTType = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [
        { type: 'text', value: 'Values inside disabled RichTextEditor' },
      ],
    },
  ],
}

const Example = () => {
  return (
    <FormNonCompound onSubmit={() => {}}>
      {' '}
      <RichTextEditor
        id='disabled-no-value'
        name='disabledWithNoValue'
        label='disabled without value'
        onChange={noop}
        placeholder='Write some cool rich text'
        disabled
      />
      <RichTextEditor
        id='disabled-with-value'
        name='disabledWithValue'
        label='disabled with default value'
        onChange={noop}
        defaultValue={ast}
        disabled
      />
    </FormNonCompound>
  )
}

export default Example
