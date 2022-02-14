import React, { useState } from 'react'
import {
  RichTextEditor,
  RichTextEditorChangeHandler,
  Container
} from '@toptal/picasso'

const ast = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Position Description' }]
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value:
            'We’re looking for hardworking, self-starting Designers for our '
        },
        {
          type: 'element',
          tagName: 'strong',
          properties: {},
          children: [{ type: 'text', value: 'Product Design' }]
        },
        {
          type: 'text',
          value: ' team to help us define how talent interacts with Toptal.'
        }
      ]
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value:
            'You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.'
        }
      ]
    },
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Requirements' }]
    },
    {
      type: 'element',
      tagName: 'ol',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'Collaborate with PMs and other designers to ship your first product features.'
            }
          ]
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [{ type: 'text', value: 'Learn about our design system.' }]
        }
      ]
    },
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Requirements' }]
    },

    {
      type: 'element',
      tagName: 'ul',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.'
            }
          ]
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.'
            }
          ]
        }
      ]
    }
  ]
}

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='editor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        defaultValue={ast}
        autofocus
      />
      <Container
        padded='small'
        top='large'
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow'
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
