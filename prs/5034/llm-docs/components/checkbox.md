# Checkbox

## Props

### Checkbox

| Name | Type | Default | Description |
|------|------|---------|-------------|
| checked | `boolean` | - | Show checkbox as `checked` |
| disabled | `boolean` | `false` | Disable changing `Checkbox` state |
| indeterminate | `boolean` | `false` | Checkbox can show indeterminate value instead of boolean |
| label | `ReactNode` | - | Text label for the `Checkbox` |
| id | `string` | - | The id of the input element |
| labelStyle | `CSSProperties` | - | Label's style |
| requiredDecoration | `"asterisk" \| "optional"` | - | Whether to show asterisk or (optional) postfix for the label as a 'required' decoration |
| onChange | `((event: ChangeEvent<HTMLInputElement>, checked: boolean) => void)` | `() => {}` | Callback invoked when `Checkbox` changed its value |
| value | `string` | - | Value of the `Checkbox` (applicable only for controlled component) |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Checkbox.Group

Checkbox group component

| Name | Type | Default | Description |
|------|------|---------|-------------|
| horizontal | `boolean` | `false` | Align checkboxes horizontally |
| spacing | `0 \| 8 \| 16 \| 24 \| 32 \| 64 \| 72 \| 80` | - | Defines amount of space between checkbox components (in px) |
| xs | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority |
| sm | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens |
| md | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens |
| lg | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens |
| xl | `false \| GridSize` | - | Defines the number of grids the component is going to use. It's applied for the xl breakpoint and wider screens |

### Uncontrolled

Can control its state by itself

```tsx
import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => (
  <div>
    <Checkbox label='Checkbox' />
  </div>
)

export default Example
```

### Controlled

Stateless checkbox, state should be controlled using prop

```tsx
import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => (
  <Checkbox.Group>
    <Checkbox checked={false} id='checkbox-unchecked' label='Unchecked' />
    <Checkbox checked id='checkbox-checked' label='Checked' />
  </Checkbox.Group>
)

export default Example
```

### Checkbox group vertical

```tsx
import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => {
  return (
    <Checkbox.Group>
      <Checkbox label='Checkbox 1' value='checkbox1' />
      <Checkbox label='Checkbox 2' value='checkbox2' />
      <Checkbox label='Checkbox 3' value='checkbox3' />
    </Checkbox.Group>
  )
}

export default Example
```

### Checkbox group horizontal

```tsx
import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => {
  return (
    <Checkbox.Group horizontal>
      <Checkbox label='Checkbox 1' value='checkbox1' />
      <Checkbox label='Checkbox 2' value='checkbox2' />
      <Checkbox label='Checkbox 3' value='checkbox3' />
    </Checkbox.Group>
  )
}

export default Example
```

### Checkbox group grid

```tsx
import React from 'react'
import { Checkbox, Container, TypographyOverflow } from '@toptal/picasso'

const Example = () => {
  return (
    <Container style={{ width: '500px' }}>
      <Checkbox.Group horizontal sm={4}>
        <Checkbox label='Checkbox 1' value='checkbox1' />
        <Checkbox label='Checkbox 2' value='checkbox2' />
        <Checkbox
          label={
            <TypographyOverflow>
              Checkbox 3 with some long text
            </TypographyOverflow>
          }
          value='checkbox3'
        />
        <Checkbox label='Checkbox 4' value='checkbox4' />
        <Checkbox label='Checkbox 5' value='checkbox5' />
        <Checkbox label='Checkbox 6' value='checkbox6' />
        <Checkbox label='Checkbox 7' value='checkbox7' />
        <Checkbox label='Checkbox 8' value='checkbox8' />
        <Checkbox label='Checkbox 9' value='checkbox9' />
      </Checkbox.Group>
    </Container>
  )
}

export default Example
```

### Disabled

```tsx
import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => (
  <Checkbox.Group>
    <Checkbox checked={false} disabled label='Unchecked' />
    <Checkbox checked disabled label='Checked' />
  </Checkbox.Group>
)

export default Example
```

### Indeterminate

```tsx
import React from 'react'
import { Checkbox } from '@toptal/picasso'

const Example = () => (
  <div>
    <Checkbox indeterminate label='Select all' />
  </div>
)

export default Example
```

### Required

```tsx
import React from 'react'
import { Checkbox, Grid } from '@toptal/picasso'

const Example = () => (
  <Grid>
    <Grid.Item lg={3}>
      <Checkbox
        label='I confirm that I have legal permission from the client to feature this project.'
        requiredDecoration='asterisk'
      />
    </Grid.Item>
  </Grid>
)

export default Example
```

### Custom label

```tsx
import React from 'react'
import { Checkbox, Container, Typography } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  cursor: pointer;
`

const CustomLabelExample = () => (
  <Container flex alignItems='center'>
    <Container right={SPACING_2} flex alignItems='center'>
      <Checkbox id='id-1' />
    </Container>
    <Label htmlFor='id-1'>
      <Typography weight='semibold' size='medium'>
        I have read through the Toptal Platform Training.
      </Typography>
    </Label>
  </Container>
)

export default CustomLabelExample
```
