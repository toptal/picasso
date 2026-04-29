# Tag

Tags are used to describe other topics, including textareas,
    form fields, users, and more. By default, tags are read-only UI elements.
    They are used to surface important information about a topic. Tags may also
    be used to convey status, or used within a group to show selection.

## Props

### Tag

| Name | Type | Default | Description |
|------|------|---------|-------------|
| as | `ElementType<any>` | - | The component used for the root node. Either a string to use a DOM element or a component. |
| children | `ReactNode` | - | Text content of the `Tag` component |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Specify the icon which should be rendered inside Tag |
| disabled | `boolean` | - | Defines if `Tag` is disabled |
| onDelete | `undefined: (() => void) \| undefined` | - | A callback which is invoked after remove `Icon` is clicked  Please note that specifying this callback automatically adds remove `Icon` as children of the `Tag` |
| variant | `"light-grey" \| "blue" \| "green" \| "yellow" \| "red"` | `light-grey` | Variant of the `Tag` |
| endAdornment | `ReactNode` | - | ReactNode rendered after label |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Tag.Group

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | List of `Tag` components which you want to render inside `TagGroup` |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Tag.Rectangular

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"red" \| "yellow" \| "dark-grey" \| "light-grey" \| "green" \| "light-blue" \| "blue-main" \| "blue-darker"` | `light-grey` | Variant of the rectangular `Tag`, can not be used with the `indicator` property at the same time. |
| indicator | `"red" \| "yellow" \| "light-grey" \| "green" \| "light-blue" \| "blue-darker" \| "blue" \| "grey-darker"` | - | Indicator color, can not be used with the `variant` property at the same time. The Tag's `variant` property is automatically set to `light` when indicator color is set. |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Tag.Connection

Used inside endAdornment to showcase number of connections

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `string` | - | renders number of connections |

### Tag.Checkable

Used when you need toggable Tag

| Name | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | `false` | Represents visual state of component |
| **children** | `string` | - | Text content of the `Tag` component |
| disabled | `boolean` | - | Defines if `Tag` is disabled |
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Specify the icon which should be rendered inside Tag |
| onChange | `((checked: boolean) => void)` | - | Callback invoked when component is clicked |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React from 'react'
import {
  Tag,
  Settings16,
  Container,
  Typography,
  Tooltip,
} from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso-utils'

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

const Example = () => (
  <Container flex gap={SPACING_4}>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>Regular</Typography>
      <div>
        <Tag>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Icon</Typography>
      <div>
        <Tag icon={<Settings16 />}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Remove</Typography>
      <div>
        <Tag onDelete={handleDelete}>Label</Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>Disabled</Typography>
      <div>
        <Tag disabled>Label</Tag>
      </div>
      <div>
        <Tag disabled icon={<Settings16 />}>
          Label
        </Tag>
      </div>
      <div>
        <Tag
          disabled
          icon={<Settings16 />}
          endAdornment={<Tag.Connection>0</Tag.Connection>}
        >
          Label
        </Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Connection</Typography>
      <div>
        <Tag
          icon={<Settings16 />}
          endAdornment={<Tag.Connection>0</Tag.Connection>}
        >
          Label
        </Tag>
      </div>
    </Container>
    <Container flex direction='column' gap={SPACING_2}>
      <Typography>With Tooltip</Typography>
      <div>
        <Tooltip interactive content='ssddssdsdsd'>
          <Tag>Label</Tag>
        </Tooltip>
      </div>
    </Container>
  </Container>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Container, Settings16, Tag } from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex>
    <Container
      flex
      direction='column'
      gap={SPACING_4}
      right={SPACING_4}
      top={SPACING_2}
    >
      <Tag variant='light-grey'>Light grey</Tag>
      <Tag icon={<Settings16 />} variant='light-grey'>
        Light grey
      </Tag>
    </Container>

    <Container
      flex
      direction='column'
      gap={SPACING_4}
      right={SPACING_4}
      top={SPACING_2}
    >
      <Tag variant='blue'>Blue</Tag>
      <Tag icon={<Settings16 />} variant='blue'>
        Blue
      </Tag>
    </Container>

    <Container
      flex
      direction='column'
      gap={SPACING_4}
      right={SPACING_4}
      top={SPACING_2}
    >
      <Tag variant='green'>Green</Tag>
      <Tag icon={<Settings16 />} variant='green'>
        Green
      </Tag>
    </Container>

    <Container
      flex
      direction='column'
      gap={SPACING_4}
      right={SPACING_4}
      top={SPACING_2}
    >
      <Tag variant='yellow'>Yellow</Tag>
      <Tag icon={<Settings16 />} variant='yellow'>
        Yellow
      </Tag>
    </Container>

    <Container flex direction='column' gap={SPACING_4} top={SPACING_2}>
      <Tag variant='red'>Red</Tag>
      <Tag icon={<Settings16 />} variant='red'>
        Red
      </Tag>
    </Container>
  </Container>
)

export default Example
```

### Checkable

```tsx
import React, { useState } from 'react'
import { Tag, Container, Typography, Settings16 } from '@toptal/picasso'
import { SPACING_4, SPACING_2, noop } from '@toptal/picasso-utils'

const Example = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <Container flex gap={SPACING_4}>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Regular</Typography>
        <div>
          <Tag.Checkable
            icon={<Settings16 />}
            checked={checked}
            onChange={() => {
              setChecked(!checked)
            }}
          >
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Hovered</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} hovered onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Checked</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} checked onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Hovered on Selected</Typography>
        <div>
          <Tag.Checkable icon={<Settings16 />} hovered checked onChange={noop}>
            Label
          </Tag.Checkable>
        </div>
      </Container>
      <Container flex direction='column' gap={SPACING_2}>
        <Typography>Disabled</Typography>
        <div>
          <Tag.Checkable
            icon={<Settings16 />}
            hovered
            checked
            disabled
            onChange={noop}
          >
            Label
          </Tag.Checkable>
        </div>
      </Container>
    </Container>
  )
}

export default Example
```

## Group of tags

You can combine different variants and styles of the Tags by using <Tag.Group /> component

### Tag group

```tsx
import React from 'react'
import { Tag } from '@toptal/picasso'

const Example = () => (
  <Tag.Group>
    <Tag>Angular JS</Tag>
    <Tag>React JS</Tag>
    <Tag onDelete={handleDelete}>Ember JS</Tag>
    <Tag>Vue JS</Tag>
  </Tag.Group>
)

const handleDelete = () => {
  window.alert('You clicked the delete icon.')
}

export default Example
```

## Rectangular tags

Rectangular variant of Tags.

### Variants

```tsx
import React from 'react'
import { Container, Tag } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex gap={SPACING_4}>
    <Tag.Rectangular variant='red'>Red</Tag.Rectangular>
    <Tag.Rectangular variant='yellow'>Yellow</Tag.Rectangular>
    <Tag.Rectangular variant='green'>Green</Tag.Rectangular>
    <Tag.Rectangular variant='dark-grey'>Dark grey</Tag.Rectangular>
    <Tag.Rectangular variant='light-grey'>Light grey</Tag.Rectangular>
    <Tag.Rectangular variant='blue-main'>Blue main</Tag.Rectangular>
    <Tag.Rectangular variant='blue-darker'>Blue darker</Tag.Rectangular>
    <Tag.Rectangular variant='light-blue'>Light blue</Tag.Rectangular>
  </Container>
)

export default Example
```

### Indicators

```tsx
import React from 'react'
import { Container, Tag } from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='red'>Red</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='yellow'>Yellow</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='green'>Green</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='blue'>Blue</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='blue-darker'>Blue darker</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='light-blue'>Light blue</Tag.Rectangular>
    </Container>
    <Container right={SPACING_4} top={SPACING_2}>
      <Tag.Rectangular indicator='grey-darker'>Grey darker</Tag.Rectangular>
    </Container>
  </Container>
)

export default Example
```
