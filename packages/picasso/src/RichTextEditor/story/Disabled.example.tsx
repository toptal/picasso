import React from 'react'
import { ASTType } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'

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
    <Form onSubmit={() => {}}>
      {' '}
      <Form.RichTextEditor
        id='disabled-no-value'
        name='disabledWithNoValue'
        label='disabled without value'
        onChange={noop}
        placeholder='Write some cool rich text'
        disabled
      />
      <Form.RichTextEditor
        id='disabled-with-value'
        name='disabledWithValue'
        label='disabled with default value'
        onChange={noop}
        defaultValue={ast}
        disabled
      />
    </Form>
  )
}

export default Example
