# RichTextEditor

## Props

### RichTextEditor

| Name | Type | Default | Description |
|------|------|---------|-------------|
| autoFocus | `boolean` | `false` | Indicates that an element is to be focused on page load |
| defaultValue | `ASTType` | - | Default value in [HAST](https://github.com/syntax-tree/hast) format |
| disabled | `boolean` | `false` | This Boolean attribute indicates that the user cannot interact with the control. |
| **id** | `string` | - | unique identifier |
| status | `"error" \| "warning" \| "default"` | `default` | Indicate `RichTextEditor` is in `error`, `warning` or `default` state |
| hiddenInputId | `string` | - | Used inside Form with combination of Label to enable forHtml functionality |
| maxLength | `number` | - | The maximum number of characters that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters. |
| minLength | `number` | - | The minimum number of characters required that the user should enter. |
| name | `string` | - | Name attribute of the input element |
| minLengthMessage | `CounterMessageSetter` | - | Custom counter message for minLength |
| maxLengthMessage | `CounterMessageSetter` | - | Custom counter message for maxLength |
| onChange | `ChangeHandler` | - | Callback on text change |
| onBlur | `(() => void)` | - | Callback for blur event |
| onFocus | `(() => void)` | - | Callback for focus event |
| placeholder | `string` | - | The placeholder attribute specifies a short hint that describes the expected value of a text editor. |
| plugins | `EditorPlugin[]` | - | List of plugins to enable on the editor |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

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
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```

### Default value

```tsx
import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import type {
  RichTextEditorChangeHandler,
  ASTType,
} from '@toptal/picasso-rich-text-editor'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'

const ast: ASTType = {
  type: 'root',
  children: [
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Position Description' }],
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'text',
          value:
            'We’re looking for hardworking, self-starting Designers for our ',
        },
        {
          type: 'element',
          tagName: 'strong',
          properties: {},
          children: [{ type: 'text', value: 'Product Design' }],
        },
        {
          type: 'text',
          value: ' team to help us define how talent interacts with Toptal.',
        },
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
            'You’ll build beautiful and inspiring design experiences that help users discover and connect with resources they need in truly innovative ways.',
        },
      ],
    },
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Requirements' }],
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
                'Collaborate with PMs and other designers to ship your first product features.',
            },
          ],
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [{ type: 'text', value: 'Learn about our design system.' }],
        },
      ],
    },
    {
      type: 'element',
      tagName: 'h3',
      properties: {},
      children: [{ type: 'text', value: 'Requirements' }],
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
                'Proficiency with various design and prototyping tools (such as Sketch, Abstract, Marvel, Principle, Figma), as well as knowledge of HTML and CSS.',
            },
          ],
        },
        {
          type: 'element',
          tagName: 'li',
          properties: {},
          children: [
            {
              type: 'text',
              value:
                'An understanding that phenomenal experiences come from collaborative decision-making with front-end developers, engineers, researchers, content strategists, and other disciplines.',
            },
          ],
        },
      ],
    },
  ],
}

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='defaultValueEditor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        defaultValue={ast}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```

### Disabled

```tsx
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
```

### Limit Length

```tsx
import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='limit'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        minLength={5}
        maxLength={25}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```

### Status

```tsx
import React from 'react'
import { FormNonCompound, RichTextEditor } from '@toptal/picasso-forms'

const Example = () => {
  return (
    <FormNonCompound onSubmit={() => {}}>
      <RichTextEditor
        label='Default'
        id='editor-default'
        placeholder='Write some cool rich text'
        name='default'
      />
      <RichTextEditor
        label='Error'
        id='editor-error'
        placeholder='Write some cool rich text'
        status='error'
        name='error'
      />
      <RichTextEditor
        label='Warning'
        id='editor-warning'
        placeholder='Write some cool rich text'
        status='warning'
        name='warning'
      />
    </FormNonCompound>
  )
}

export default Example
```

### Links

```tsx
import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { LinkPlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='allow-links-editor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        plugins={[<LinkPlugin />]}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```

### Emojis

```tsx
import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import { EmojiPlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'
import type { RichTextEditorProps } from '..'

const customEmojis: RichTextEditorProps['customEmojis'] = [
  {
    id: 'talent-community',
    name: 'Talent Community',
    emojis: [
      {
        id: 'talent-community',
        name: 'Talent Community',
        keywords: ['Toptal', 'Talent Community', 'Community'],
        skins: [
          {
            src: 'https://emoji.slack-edge.com/T01HSMSV622/talent-community/3937b2735bdea8c3.png',
          },
        ],
      },
    ],
  },
]

const Example = () => {
  const [value, setValue] = useState<string | undefined>()

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <RichTextEditor
        id='allow-emojis-editor'
        onChange={handleChange}
        placeholder='Write some cool rich text with emojis!'
        plugins={[<EmojiPlugin customEmojis={customEmojis} />]}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```

### Image upload

```tsx
import React, { useState } from 'react'
import { Container, Radio } from '@toptal/picasso'
import { SPACING_6, SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import type { UploadedImage } from '@toptal/picasso-rich-text-editor'
import { ImagePlugin, RichTextEditor } from '@toptal/picasso-rich-text-editor'

import type { RichTextEditorChangeHandler } from '../types'

// Imitate file upload function that sets image URL
const onUploadSucceeded = (uploadedImage: UploadedImage) =>
  new Promise<UploadedImage>(resolve => {
    setTimeout(() => {
      const fileUrl = `./jacqueline/128x128.jpg?originalFileName=${encodeURIComponent(
        uploadedImage.file.name
      )}`

      resolve({ ...uploadedImage, url: fileUrl })
    }, 2000)
  })

// Imitate failure during upload
const onUploadFailed = () =>
  new Promise<UploadedImage>((resolve, reject) => {
    setTimeout(() => {
      reject('Upload failed')
    }, 2000)
  })

const Example = () => {
  const [value, setValue] = useState<string | undefined>()
  const [useSuccessfulUpload, setUseSuccessfullUpload] = useState('true')

  const handleChange: RichTextEditorChangeHandler = newValue =>
    setValue(newValue)

  return (
    <>
      <Container bottom={SPACING_6}>
        <Radio.Group
          name='onUploadCase'
          onChange={(event: React.ChangeEvent<{ value: string }>) => {
            setUseSuccessfullUpload(event.target.value)
          }}
          value={useSuccessfulUpload}
        >
          <Radio label='Simulate successful upload' value='true' />
          <Radio label='Simulate failing upload' value='false' />
        </Radio.Group>
      </Container>
      <RichTextEditor
        id='editor'
        onChange={handleChange}
        placeholder='Write some cool rich text'
        plugins={[
          <ImagePlugin
            onUpload={
              useSuccessfulUpload === 'true'
                ? onUploadSucceeded
                : onUploadFailed
            }
          />,
        ]}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```

### Code

```tsx
import React, { useState } from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_8 } from '@toptal/picasso-utils'
import {
  CodeBlockPlugin,
  CodePlugin,
  RichTextEditor,
} from '@toptal/picasso-rich-text-editor'
import { htmlToHast } from '@toptal/picasso-rich-text-editor/utils'

import type { RichTextEditorChangeHandler } from '../types'

// we expect defaultValue to be HAST from BE
const defaultValue = htmlToHast(
  `<p>foo <code>bar</code> baz</p><p>qux <code>quux</code> quuz</p>
<pre>&lt;CodeBlock<br> {...props}<br>/&gt;</pre>`
)

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
        plugins={[<CodePlugin />, <CodeBlockPlugin />]}
        defaultValue={defaultValue}
      />
      <Container
        padded={SPACING_4}
        top={SPACING_8}
        style={{
          fontFamily: "Consolas, 'Courier New', monospace",
          background: 'lightyellow',
        }}
      >
        {value}
      </Container>
    </>
  )
}

export default Example
```
