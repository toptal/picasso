# Image

Display any types of images.

## Props

### Image

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **alt** | `string` | - | Image alt text |
| **src** | `string` | - | Image url |
| srcSet | `string` | - | A set of image sources |
| variant | `"rectangle" \| "circular"` | `rectangle` | Image shape type |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Image } from '@toptal/picasso'

const Example = () => (
  <div>
    <Image
      src='./jacqueline-with-flowers-1954.jpg'
      alt='Not square default image'
      style={{ width: '250px', height: '307px' }}
    />
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Image, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container inline>
      <Image
        src='./jacqueline-with-flowers-1954-square.jpg'
        alt='Default image'
        style={{ width: '250px', height: '250px' }}
      />
    </Container>
    <Container left={SPACING_4} inline>
      <Image
        variant='circular'
        alt='Circular image'
        src='./jacqueline-with-flowers-1954-square.jpg'
        style={{ width: '250px', height: '250px' }}
      />
    </Container>
  </div>
)

export default Example
```
