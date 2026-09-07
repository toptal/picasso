# EmptyState

## Props

### EmptyState.Page

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **image** | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Adds <Icon /> above EmptyStatePage content |
| title | `string` | - | Adds Title string below the main image |

### EmptyState.Collection

| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | `ReactElement<any, string \| JSXElementConstructor<any>>` | - | Adds <Icon /> before EmptyStateCollection content |

## EmptyState.Page

```tsx
import React from 'react'
import { EmptyState, Container, Image } from '@toptal/picasso'

const DefaultExample = () => (
  <Container>
    <EmptyState.Page
      title='Memorandums page is empty'
      image={
        <Image
          src='./jacqueline-with-flowers-1954-square.jpg'
          alt='Placeholder image'
        />
      }
    >
      No memorandums were added yet
    </EmptyState.Page>
  </Container>
)

export default DefaultExample
```

## EmptyState.Collection

```tsx
import React from 'react'
import { EmptyState, Container } from '@toptal/picasso'

const DefaultExample = () => (
  <Container>
    <EmptyState.Collection>No memorandums were added yet</EmptyState.Collection>
  </Container>
)

export default DefaultExample
```
