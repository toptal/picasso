# Slider

Slider is used to pick a numeric value from the predefined range

## Props

### Slider

| Name | Type | Default | Description |
|------|------|---------|-------------|
| min | `number` | `0` | Minimum slider value |
| max | `number` | `100` | Maximum slider value |
| value | `number \| number[]` | - | Controlled value of the component |
| defaultValue | `number \| number[]` | `0` | The default value. Use when the component is not controlled |
| step | `number` | - | Step for the thumb movement |
| marks | `boolean` | - | Whether marks are shown or not |
| disabled | `boolean` | - | Whether component is disabled or not |
| tooltip | `"on" \| "auto" \| "off"` | `off` | Controls when tooltip is displayed: - **auto** the value tooltip will display when the thumb is hovered or focused. - **on** will display persistently. - **off** will never display |
| tooltipFormat | `string \| ((value: number, index: number) => ReactNode)` | - | The format function the value tooltip's value. |
| onChange | `((event: Event, value: number \| number[], activeThumb: number) => void)` | - | Callback invoked when slider changes its state. |
| onFocus | `((event: FocusEvent<HTMLElement, Element>) => void)` | - | Callback invoked on focus |
| onBlur | `((event: FocusEvent<HTMLElement, Element>) => void)` | - | Callback invoked on blur |
| hideThumbOnEmpty | `boolean` | - | Hide thumb when value is undefined or null. Works only when the component is controlled. |
| disableTrackHighlight | `boolean` | - | Disable track highlight. |
| name | `string` | - | Name attribute of the `input` element. |
| id | `string` | - | Id attribute of the `input` element. |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>(0)

  const handleChange = (_: Event, newValue: Value) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Slider value={value} onChange={handleChange} />
    </Container>
  )
}

export default Example
```

### Initial value

```tsx
import React from 'react'
import { Container, Slider } from '@toptal/picasso'

const Example = () => {
  return (
    <Container>
      <Slider defaultValue={8} />
    </Container>
  )
}

export default Example
```

### Controlled value

```tsx
import React, { useState } from 'react'
import { Button, Grid, Slider } from '@toptal/picasso'
import { Plus16, Minus16 } from '@toptal/picasso-icons'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(Number(newValue))
  }

  return (
    <Grid alignItems='center'>
      <Grid.Item sm={6}>
        <Grid alignItems='center'>
          <Grid.Item>
            <Button
              onClick={() => setValue(value - 1)}
              variant='secondary'
              size='small'
              icon={<Minus16 />}
            >
              Zoom out
            </Button>
          </Grid.Item>
          <Grid.Item sm>
            <Slider value={value} onChange={handleChange} max={5} />
          </Grid.Item>
          <Grid.Item>
            <Button
              onClick={() => setValue(value + 1)}
              variant='secondary'
              size='small'
              icon={<Plus16 />}
            >
              Zoom In
            </Button>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  )
}

export default Example
```

### Controlled value with label

```tsx
import React, { useState } from 'react'
import { Grid, Slider, Typography } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState(0)
  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(Number(newValue))
  }

  return (
    <Grid alignItems='center'>
      <Grid.Item sm={6}>
        <Grid alignItems='center'>
          <Grid.Item sm>
            <Slider value={value} onChange={handleChange} max={100} />
          </Grid.Item>
          <Grid.Item>
            <Typography size='medium'>{value}</Typography>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  )
}

export default Example
```

### Minimum and Maximum value with label

```tsx
import React from 'react'
import { Grid, Slider, Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <Grid alignItems='center'>
      <Grid.Item sm={6}>
        <Grid alignItems='center'>
          <Grid.Item>
            <Typography size='medium'>{0}</Typography>
          </Grid.Item>
          <Grid.Item sm>
            <Slider max={100} />
          </Grid.Item>
          <Grid.Item>
            <Typography size='medium'>{100}</Typography>
          </Grid.Item>
        </Grid>
      </Grid.Item>
    </Grid>
  )
}

export default Example
```

### Tooltip

```tsx
import React, { useState } from 'react'
import { Container, Slider, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_8, SPACING_10 } from '@toptal/picasso-utils'

type Value = number

const formatLabel = (value: Value) => {
  const formattedVal = String(value).padStart(2, '0')

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)
  const handleChange1 = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue1(newValue)
  }
  const handleChange2 = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue2(newValue)
  }
  const handleChange3 = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue3(newValue)
  }

  return (
    <Container padded={SPACING_4}>
      <Container>
        <Typography variant='heading' size='small'>
          Display persistently
        </Typography>
        <Container top={SPACING_8}>
          <Slider value={value1} onChange={handleChange1} tooltip='on' />
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          Display when the thumb is hovered or focused
        </Typography>
        <Container top={SPACING_8}>
          <Slider value={value2} onChange={handleChange2} tooltip='auto' />
        </Container>
      </Container>
      <Container top={SPACING_8}>
        <Typography variant='heading' size='small'>
          Custom rendered label
        </Typography>
        <Container top={SPACING_10}>
          <Slider
            min={0}
            max={23}
            tooltip='on'
            value={value3}
            onChange={handleChange3}
            tooltipFormat={formatLabel}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```

### Range

```tsx
import React from 'react'
import { Slider, Typography, Container } from '@toptal/picasso'
import { SPACING_10, SPACING_8 } from '@toptal/picasso-utils'

type Value = number | number[]

const renderLabel = (value: Value) => {
  let formattedVal = String(value)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  const [value, setValue] = React.useState<Value>([10, 20])

  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Typography variant='heading' size='small'>
        Time Zone
      </Typography>
      <Container top={SPACING_10} right={SPACING_8} left={SPACING_8}>
        <Slider
          value={value}
          min={0}
          max={23}
          onChange={handleChange}
          tooltip='on'
          tooltipFormat={renderLabel}
        />
      </Container>
    </Container>
  )
}

export default Example
```

### Range with value label

```tsx
import React from 'react'
import { Slider, Typography, Container, Grid } from '@toptal/picasso'

type Value = number | number[]

const renderLabel = (value: Value) => {
  let formattedVal = String(value)

  formattedVal = formattedVal.length === 2 ? formattedVal : '0' + formattedVal

  return <Typography color='inherit'>GMT+{formattedVal}:00</Typography>
}

const Example = () => {
  const [value, setValue] = React.useState<Value>([10, 20])

  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(newValue)
  }

  const [firstValue, secondValue] = Array.isArray(value) ? value : [0, value]

  return (
    <Container>
      <Grid alignItems='center' spacing={16}>
        <Grid.Item sm={1}>
          <Typography align='center' size='medium'>
            {firstValue}
          </Typography>
        </Grid.Item>
        <Grid.Item sm={10}>
          <Slider
            value={value}
            min={0}
            max={23}
            onChange={handleChange}
            tooltip='on'
            tooltipFormat={renderLabel}
          />
        </Grid.Item>
        <Grid.Item sm={1}>
          <Typography align='center' size='medium'>
            {secondValue}
          </Typography>
        </Grid.Item>
      </Grid>
    </Container>
  )
}

export default Example
```

### Marks

```tsx
import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>(10)
  const handleChange = (_: React.ChangeEvent<{}>, val: Value) => {
    window.console.log('onChange: ', val)
    setValue(val)
  }

  return (
    <Container>
      <Slider
        value={value}
        step={10}
        marks
        min={10}
        max={110}
        onChange={handleChange}
      />
    </Container>
  )
}

export default Example
```

### Hide thumb when value is null or undefined

```tsx
import React, { useState } from 'react'
import { Container, Slider } from '@toptal/picasso'

type Value = number | number[]

const Example = () => {
  const [value, setValue] = useState<Value>()
  const handleChange = (_: React.ChangeEvent<{}>, newValue: Value) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Slider
        value={value}
        step={10}
        min={0}
        max={100}
        onChange={handleChange}
        marks
        hideThumbOnEmpty
      />
    </Container>
  )
}

export default Example
```

### Disable track highlight

```tsx
import React from 'react'
import { Container, Slider } from '@toptal/picasso'

const Example = () => {
  return (
    <Container>
      <Slider
        defaultValue={20}
        step={10}
        min={0}
        max={100}
        marks
        disableTrackHighlight
      />
    </Container>
  )
}

export default Example
```
