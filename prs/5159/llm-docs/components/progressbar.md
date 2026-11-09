# ProgressBar

## Props

### ProgressBar

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **value** | `number` | - | Percentage of completed progress |
| showPercentage | `boolean` | `false` | Whether to show percentage value |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Container, ProgressBar } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex direction='column' style={{ maxWidth: '200px' }}>
      <Container top={SPACING_4}>
        <ProgressBar value={0} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={10} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={20} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={30} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={40} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={50} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={60} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={70} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={80} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={90} />
      </Container>
      <Container top={SPACING_4}>
        <ProgressBar value={100} />
      </Container>
    </Container>
  )
}

export default Example
```

### With Percentage

```tsx
import React from 'react'
import { Container, ProgressBar } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column' style={{ maxWidth: '200px' }}>
    <Container top={SPACING_4}>
      <ProgressBar value={0} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={10} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={20} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={30} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={40} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={50} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={60} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={70} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={80} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={90} showPercentage />
    </Container>
    <Container top={SPACING_4}>
      <ProgressBar value={100} showPercentage />
    </Container>
  </Container>
)

export default Example
```

### Animating Progress Change

```tsx
import React, { useState } from 'react'
import { Container, Button, ProgressBar } from '@toptal/picasso'
import { SPACING_8, SPACING_4 } from '@toptal/picasso-utils'

const AnimatingProgressChange = () => {
  const [percentage, setPercentage] = useState(10)

  return (
    <Container
      flex
      direction='column'
      bottom={SPACING_8}
      style={{ width: '200px' }}
    >
      <ProgressBar value={percentage} showPercentage />
      <Container flex direction='row' top={SPACING_4}>
        <Button
          variant='primary'
          disabled={percentage <= 0}
          onClick={() => setPercentage(percentage - 10)}
        >
          Decrease
        </Button>
        <Button
          variant='primary'
          disabled={percentage >= 100}
          onClick={() => setPercentage(percentage + 10)}
        >
          Increase
        </Button>
      </Container>
    </Container>
  )
}

export default AnimatingProgressChange
```
