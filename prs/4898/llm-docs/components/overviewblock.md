# OverviewBlock

Allows displaying counters.

## Props

### OverviewBlock

| Name | Type | Default | Description |
|------|------|---------|-------------|
| onClick | `((event: MouseEvent<Element, MouseEvent>) => void)` | - | Callback invoked when component is clicked |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |
| **value** | `ReactNode` | - | Counter value |
| **label** | `ReactNode` | - | Counter title |
| variant | `"value-green" \| "value-red" \| "value-yellow" \| "label-green" \| "label-red" \| "label-yellow"` | - | The color variant |
| as | `ElementType` | `button` | Component used for the root node. Either a string to use a DOM element or a component. |

### OverviewBlock.Group

| Name | Type | Default | Description |
|------|------|---------|-------------|
| align | `"default" \| "center"` | `default` | Value and label alignment for blocks. By default content is aligned to the left. |
| blockWidth | `"narrow" \| "regular" \| "wide"` | `regular` | The block width variant |

### OverviewBlock.Row

_No props._

### Default

```tsx
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const DefaultExample = () => {
  const handleClick = (title: string) => {
    window.alert(`${title} clicked`)
  }

  return (
    <OverviewBlock.Group>
      <OverviewBlock
        value='4249'
        label='ACH'
        onClick={() => handleClick('ACH')}
      />
      <OverviewBlock
        value='19302'
        label='Credit Card'
        onClick={() => handleClick('Credit Card')}
      />
      <OverviewBlock
        value='979'
        label='PayPal'
        onClick={() => handleClick('PayPal')}
      />
      <OverviewBlock
        value='803'
        label='Wire'
        onClick={() => handleClick('Wire')}
      />
    </OverviewBlock.Group>
  )
}

export default DefaultExample
```

### Text

```tsx
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const TextExample = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock value='Active' label='Status' variant='value-green' />
      <OverviewBlock value='Developers' label='Interested In' />
      <OverviewBlock value='Ambiguous' label='Priority / Intent' />
      <OverviewBlock value='1968' label='Days in Funnel' />
    </OverviewBlock.Group>
  )
}

export default TextExample
```

### Number

```tsx
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const NumberExample = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock value='63' label='Pending tasks' variant='label-red' />
      <OverviewBlock value='0' label="Today's tasks" variant='label-red' />
      <OverviewBlock
        value='0'
        label="This week's tasks"
        variant='label-green'
      />
      <OverviewBlock value='63' label='Total tasks' />
      <OverviewBlock value='63' label='Playbook tasks' variant='label-yellow' />
    </OverviewBlock.Group>
  )
}

export default NumberExample
```

### Multi-line

```tsx
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const MultilineExample = () => (
  <section>
    <OverviewBlock.Group>
      <OverviewBlock.Row>
        <OverviewBlock
          value='$26,125,123.70'
          label='Outstanding'
          variant='label-yellow'
        />
        <OverviewBlock
          value='$5,837,806.68'
          label='Overdue'
          variant='label-red'
        />
        <OverviewBlock
          value='$1,232,107.99'
          label='Disputed'
          variant='label-red'
        />
        <OverviewBlock
          value='$1,722,076.43'
          label='Incollections'
          variant='label-red'
        />
      </OverviewBlock.Row>
      <OverviewBlock.Row>
        <OverviewBlock
          value='$935,590.65'
          label='Written off'
          variant='label-red'
        />
        <OverviewBlock value='$5,758,716.46' label='Pending receipt' />
        <OverviewBlock
          value='$44,244,163.83'
          label='Credited'
          variant='label-green'
        />
        <OverviewBlock
          value='$585,895,606.35'
          label='Paid'
          variant='label-green'
        />
      </OverviewBlock.Row>
    </OverviewBlock.Group>
  </section>
)

export default MultilineExample
```

### Routing

```tsx
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'
import { MemoryRouter as Router, Link, Route, Switch } from 'react-router-dom'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const RoutingExample = () => (
  <Router>
    <div>
      <OverviewBlock.Group>
        <OverviewBlock value='10' label='Home' as={Link} to='/' />
        <OverviewBlock
          value='11'
          label='About'
          variant='label-green'
          as={Link}
          to='/about'
        />
        <OverviewBlock
          value='15'
          label='Users'
          variant='label-green'
          as={Link}
          to='/users'
        />
      </OverviewBlock.Group>

      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route>
          <Index />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default RoutingExample
```

### Custom label

```tsx
import React from 'react'
import { Typography, OverviewBlock, Tooltip } from '@toptal/picasso'

const customLabel = (
  <Tooltip content='You inside the tooltip!' placement='top'>
    <Typography size='xxsmall' weight='semibold'>
      Custom Label with Tooltip
    </Typography>
  </Tooltip>
)

const CustomLabel = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock value='4249' label={customLabel} />
      <OverviewBlock value='19302' label='Standard Label' />
    </OverviewBlock.Group>
  )
}

export default CustomLabel
```

## Visual variants of the groups

### Center Aligned

```tsx
import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const CenterAlignedExample = () => {
  return (
    <OverviewBlock.Group align='center'>
      <OverviewBlock value='12345678' label='Label' variant='label-red' />
      <OverviewBlock
        value='$585,895,606.35'
        label='Paid'
        variant='label-green'
      />
    </OverviewBlock.Group>
  )
}

export default CenterAlignedExample
```

### Block Width

```tsx
import React from 'react'
import { OverviewBlock, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const BlockWidthExample = () => {
  return (
    <Container>
      <Container>
        <OverviewBlock.Group blockWidth='narrow'>
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
          <OverviewBlock value='Narrow' label='Width' />
        </OverviewBlock.Group>
      </Container>

      <Container top={SPACING_4}>
        <OverviewBlock.Group blockWidth='regular'>
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
          <OverviewBlock value='Regular' label='Width' />
        </OverviewBlock.Group>
      </Container>

      <Container top={SPACING_4}>
        <OverviewBlock.Group blockWidth='wide'>
          <OverviewBlock value='Wide' label='Width' />
          <OverviewBlock value='Wide' label='Width' />
          <OverviewBlock value='Wide' label='Width' />
        </OverviewBlock.Group>
      </Container>
    </Container>
  )
}

export default BlockWidthExample
```
