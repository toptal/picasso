# Loader

Loaders indicate that an action is underway and that the user must wait to proceed until it is finished.

## Props

### Loader

| Name | Type | Default | Description |
|------|------|---------|-------------|
| children | `ReactNode` | - | Text content for the `Loader` |
| inline | `boolean` | `false` | Shows loader as part of other inline elements such as text |
| size | `"small" \| "medium" \| "large"` | `medium` | Size of the `Loader` |
| value | `number` | - | Set the value if want to have static loader with the value specified |
| variant | `"blue" \| "inherit"` | `blue` | Set this value if you want loader to inherit color of the parent, primary by default |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Loader } from '@toptal/picasso'

const Example = () => (
  <div>
    <Loader />
  </div>
)

export default Example
```

### With label

```tsx
import React from 'react'
import { Loader } from '@toptal/picasso'

const Example = () => (
  <div>
    <Loader>Loading...</Loader>
  </div>
)

export default Example
```

### With inline content

```tsx
import React from 'react'
import { Loader } from '@toptal/picasso'

const Example = () => (
  <div>
    <Loader inline />
    <span>Content...</span>
  </div>
)

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Loader, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_8}>
      <Loader size='small'>small</Loader>
    </Container>
    <Container bottom={SPACING_8}>
      <Loader size='medium'>medium</Loader>
    </Container>
    <Loader size='large'>large</Loader>
  </div>
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Loader } from '@toptal/picasso'

const Example = () => (
  <div style={{ color: 'purple' }}>
    <Loader variant='inherit'>inherit</Loader>
  </div>
)

export default Example
```

### Controlled value

Loader with determined or static values

```tsx
import React, { useState } from 'react'
import { Loader } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(50)

  return (
    <div className='flex flex-col items-center gap-8'>
      <Loader value={value}>{`${value}%`}</Loader>
      <input
        type='range'
        min='0'
        max='100'
        value={value}
        onChange={event => setValue(event.target.valueAsNumber)}
        step='10'
      />
    </div>
  )
}

export default Example
```
