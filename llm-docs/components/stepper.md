# Stepper

Stepper component display progress through a sequence of steps.

## Props

### Stepper

| Name | Type | Default | Description |
|------|------|---------|-------------|
| hideLabels | `boolean` | `false` | Hide labels of non active steps |
| active | `number` | `0` | The index of the active step |
| steps | `string[] \| { key: Key; content: ReactNode; }[]` | `[]` | Array of the step labels |
| overflowEllipsis | `boolean` | `false` | Enable overflow ellipsis for labels (it will not work when custom block-level `steps.content` element is provided (for example, steps={[{ key: 'foo', content: <div>Longstring</div> }]}) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Stepper.Vertical

| Name | Type | Default | Description |
|------|------|---------|-------------|
| active | `number` | `0` | The index of the active step |
| steps | `string[] \| { key: Key; content: ReactNode; }[]` | `[]` | Array of the step labels |
| overflowEllipsis | `boolean` | - | Enable overflow ellipsis for labels (it will not work when custom block-level `steps.content` element is provided (for example, steps={[{ key: 'foo', content: <div>Longstring</div> }]}) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Default

```tsx
import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container padded={SPACING_6}>
      <Stepper steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        active={1}
        steps={[
          { key: '1', content: <span>Step 1</span> },
          { key: 'key-2', content: <span>Step 2</span> },
          { key: 'Step 3', content: <span>Step 3</span> },
          { key: 'custom-key-4', content: <span>Step 4</span> },
        ]}
      />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper active={3} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper active={4} steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
  </div>
)

export default Example
```

### Without Labels

```tsx
import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container padded={SPACING_6}>
      <Stepper hideLabels steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        hideLabels
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        hideLabels
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container top={SPACING_4} padded={SPACING_6}>
      <Stepper
        hideLabels
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
  </div>
)

export default Example
```

### Vertical

```tsx
import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import { SPACING_6, SPACING_10 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='row'>
    <Container padded={SPACING_6}>
      <Stepper.Vertical steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
    </Container>
    <Container padded={SPACING_6} left={SPACING_10}>
      <Stepper.Vertical
        active={1}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container padded={SPACING_6} left={SPACING_10}>
      <Stepper.Vertical
        active={3}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
    <Container padded={SPACING_6} left={SPACING_10}>
      <Stepper.Vertical
        active={4}
        steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
      />
    </Container>
  </Container>
)

export default Example
```

### Overflow

```tsx
import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  width: 450px;
  border: 1px solid #000;
`

const Example = () => (
  <StyledContainer padded='medium'>
    <Stepper
      overflowEllipsis
      steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
    />
  </StyledContainer>
)

export default Example
```
