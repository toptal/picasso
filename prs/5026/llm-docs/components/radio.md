# Radio

Radio buttons are best used when users need to select a single option from a set of unfamiliar choices. 
    Radio buttons surface all the options and allow the user to compare choices before making a selection.

## Props

### Radio

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `ReactNode` | - | Text label for the `Radio` |
| value | `string \| number \| boolean` | - | Value of the `Radio` component used with conjunction of `Radio.Group` |
| disabled | `boolean` | `false` | Defines if `Radio` is disabled |
| checked | `boolean` | - | Defines if `Radio` is checked by default |
| onChange | `undefined: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void` | - | Callback invoked when `Radio` changes its state |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Radio.Group

Radio group component

| Name | Type | Default | Description |
|------|------|---------|-------------|
| horizontal | `boolean` | `false` | Align radios horizontally |
| spacing | `0 \| 8 \| 16 \| 24 \| 32 \| 64 \| 72 \| 80` | - | Defines amount of space between radio buttons components (in px) |
| xs | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority |
| sm | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens |
| md | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens |
| lg | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens |
| xl | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the xl breakpoint and wider screens |

### Default

```tsx
import React from 'react'
import { Radio } from '@toptal/picasso'

const Example = () => (
  <div>
    <Radio label='Radio' data-testid='trigger' />
  </div>
)

export default Example
```

### Checked

```tsx
import React from 'react'
import { Radio } from '@toptal/picasso'

const Example = () => (
  <div>
    <Radio label='Checked' checked />
  </div>
)

export default Example
```

### Disabled

```tsx
import React from 'react'
import { Radio } from '@toptal/picasso'

const Example = () => (
  <div>
    <Radio disabled label='Disabled' />
  </div>
)

export default Example
```

### Radio group vertical

```tsx
import React, { useState } from 'react'
import { Radio } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Radio.Group
      name='variableName'
      onChange={(event: React.ChangeEvent<{ value: string }>) =>
        setValue(event.target.value)
      }
      value={value}
    >
      <Radio label='Radio 1' value='radio1' />
      <Radio label='Radio 2' value='radio2' />
      <Radio label='Radio 3' value='radio3' />
    </Radio.Group>
  )
}

export default Example
```

### Radio group horizontal

```tsx
import React, { useState } from 'react'
import { Radio } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<string>('')

  return (
    <Radio.Group
      name='variableName'
      onChange={(event: React.ChangeEvent<{ value: string }>) =>
        setValue(event.target.value)
      }
      horizontal
      value={value}
    >
      <Radio label='Radio 1' value='radio1' />
      <Radio label='Radio 2' value='radio2' />
      <Radio label='Radio 3' value='radio3' />
    </Radio.Group>
  )
}

export default Example
```

### Radio group grid

```tsx
import React, { useState } from 'react'
import { Container, Radio, TypographyOverflow } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState('')

  return (
    <Container style={{ width: '500px' }}>
      <Radio.Group
        name='variableName'
        onChange={(event: React.ChangeEvent<{ value: string }>) =>
          setValue(event.target.value)
        }
        horizontal
        sm={4}
        value={value}
      >
        <Radio label='Radio 1' value='radio1' />
        <Radio label='Radio 2' value='radio2' />
        <Radio
          label={
            <TypographyOverflow>Radio 3 with some long text</TypographyOverflow>
          }
          value='radio3'
        />
        <Radio label='Radio 4' value='radio4' />
        <Radio label='Radio 5' value='radio5' />
        <Radio label='Radio 6' value='radio6' />
        <Radio label='Radio 7' value='radio7' />
        <Radio label='Radio 8' value='radio8' />
        <Radio label='Radio 9' value='radio9' />
      </Radio.Group>
    </Container>
  )
}

export default Example
```

### Custom label

```tsx
import React from 'react'
import { Radio, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_6 } from '@toptal/picasso-utils'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  cursor: pointer;
`

const List = styled.ul`
  padding-left: 20px;
  font-size: 12px;
  margin: 0;
`

const CustomRadio = () => {
  return (
    <Container flex alignItems='center'>
      <Container right={SPACING_2} flex alignItems='center'>
        <Radio id='id-1' />
      </Container>
      <Label htmlFor='id-1'>
        <Typography weight='semibold' size='large'>
          Payoneer
        </Typography>
      </Label>
    </Container>
  )
}

const Benefits = () => {
  return (
    <Container>
      <List>
        <li>
          <Typography size='xsmall'>
            Similar benefits to Toptal Payments
          </Typography>
        </li>
        <li>
          <Typography size='xsmall'>
            Instantly transfer funds to a prepaid card{' '}
          </Typography>
        </li>
      </List>
    </Container>
  )
}

const PayoneerLogo = () => {
  return (
    <Container flex alignItems='center'>
      <img src='./payoneer-logo.png' />
    </Container>
  )
}

const PayoneerPicker = () => {
  return (
    <Container
      flex
      alignItems='center'
      justifyContent='space-between'
      bottom={SPACING_2}
    >
      <CustomRadio />
      <PayoneerLogo />
    </Container>
  )
}

const Example = () => (
  <div>
    <Container
      rounded
      padded={SPACING_6}
      variant='blue'
      style={{ maxWidth: 400 }}
    >
      <PayoneerPicker />
      <Benefits />
    </Container>
  </div>
)

export default Example
```
