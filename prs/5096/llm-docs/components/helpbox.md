# Helpbox

Container specialized for rendering suggestions

## Props

### Helpbox

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Children components (`Helpbox.Title`, `Helpbox.Content`, `Hdlpbox.Actions`) |
| variant | `"transparent" \| "red" \| "green" \| "white" \| "yellow" \| "blue" \| "grey"` | - | Color variant of Helpbox |
| onClose | `((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)` | - | Callback invoked when close is clicked |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Helpbox.Title

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `string` | - | Title of Helpbox |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Helpbox.Content

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Content of Helpbox |
| width | `"shrink" \| "full"` | `full` | Width of the content. If set to `shrink` - the max-width of the content is 640px |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Helpbox.Actions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **children** | `ReactNode` | - | Actions part of Helpbox |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Helpbox, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container>
    <Container bottom={SPACING_4}>
      <Helpbox>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container bottom={SPACING_4}>
      <Helpbox variant='red'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container bottom={SPACING_4}>
      <Helpbox variant='yellow'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container bottom={SPACING_4}>
      <Helpbox variant='green'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container bottom={SPACING_4}>
      <Helpbox variant='blue'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container>
      <Helpbox variant='grey'>
        <Helpbox.Title>Heading Small</Helpbox.Title>
        <Helpbox.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
  </Container>
)

export default Example
```

### With actions

```tsx
import React from 'react'
import { Helpbox, Container, Button } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Helpbox variant='yellow'>
      <Helpbox.Title>Heading Small</Helpbox.Title>
      <Helpbox.Actions>
        <Button size='small' variant='secondary'>
          Action1
        </Button>
        <Button size='small'>Action2</Button>
      </Helpbox.Actions>
      <Helpbox.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Helpbox.Content>
    </Helpbox>
  </Container>
)

export default Example
```

### Closeable

```tsx
import React from 'react'
import { Helpbox, Container } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Helpbox variant='green' onClose={() => window.alert('Close clicked')}>
      <Helpbox.Title>Heading Small</Helpbox.Title>
      <Helpbox.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Helpbox.Content>
    </Helpbox>
  </Container>
)

export default Example
```

### Width

```tsx
import React from 'react'
import { Helpbox, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container>
    <Container bottom={SPACING_4}>
      <Helpbox variant='green'>
        <Helpbox.Title>Full width</Helpbox.Title>
        <Helpbox.Content width='full'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
    <Container bottom={SPACING_4}>
      <Helpbox variant='green'>
        <Helpbox.Title>Shrink width</Helpbox.Title>
        <Helpbox.Content width='shrink'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Helpbox.Content>
      </Helpbox>
    </Container>
  </Container>
)

export default Example
```
