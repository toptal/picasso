# Rating

Ratings provide a way for users to express their opinion
    and experience about features or services.

## Props

### Rating.Stars

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **name** | `string` | - | Value of the name attribute of the rating input |
| value | `number` | - | Current rating |
| onChange | `((event: ChangeEvent<HTMLInputElement>) => void)` | - | Callback invoked when a rating icon is clicked |
| renderItem | `((value: number, defaultIcon: ReactNode) => ReactNode)` | `(_, icon) => icon` | Function to customize icon rendering |
| max | `number` | `5` | Number of rating icons |
| interactive | `boolean` | `true` | Flag to allow or disable interactions with the component |
| size | `"small" \| "large"` | `small` | Size variant |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Rating.Thumbs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **name** | `string` | - | Name of the form input group |
| value | `boolean` | - | Current value for the rating, true means thumbs up, false thumbs down and undefined means not selected |
| onChange | `((value: boolean, event: ChangeEvent<HTMLDivElement>) => void)` | - | Callback invoked when the rating is changed |
| interactive | `boolean` | `true` | If the component should respond to user interactions. If false the value cannot be changed by the user. Defaults to true |
| size | `"small" \| "large"` | `small` | Size of the input control. Defaults to small |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

Default behavior

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_6, SPACING_10 } from '@toptal/picasso-utils'

const Example = () => {
  const [starsValue, setStarsValue] = useState(1)
  const [thumbsValue, setThumbsValue] = useState(true)

  const onChangeStarsValue = (event: ChangeEvent<HTMLInputElement>) => {
    setStarsValue(Number(event.target.value))
  }

  return (
    <Container padded={SPACING_4}>
      <Container bottom={SPACING_6}>
        <Typography size='medium' variant='heading'>
          Stars
        </Typography>
        <Rating.Stars
          onChange={onChangeStarsValue}
          name='rating'
          value={starsValue}
        />
      </Container>

      <Container>
        <Typography size='medium' variant='heading'>
          Thumbs
        </Typography>
        <Container flex>
          <Container right={SPACING_10}>
            <Rating.Thumbs
              onChange={setThumbsValue}
              name='rating-thumbs'
              value={thumbsValue}
            />
          </Container>
          <Rating.Thumbs
            onChange={() => setThumbsValue(!thumbsValue)}
            name='rating-thumbs-opposite'
            value={!thumbsValue}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```

### Non Interactive

The rating can be used in non-interactive mode. This mode prohibits changing its value.

```tsx
import React from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const value = 3

  return (
    <Container padded={SPACING_4}>
      <Container bottom={SPACING_6}>
        <Typography size='medium' variant='heading'>
          Stars
        </Typography>
        <Rating.Stars interactive={false} name='rating' value={value} />
      </Container>

      <Container>
        <Typography size='medium' variant='heading'>
          Thumbs
        </Typography>
        <Rating.Thumbs interactive={false} name='rating-thumbs' value={false} />
      </Container>
    </Container>
  )
}

export default Example
```

### Sizes example

The rating component has two sizes - small (default) and large. It can be set via size parameter.

```tsx
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [smallValue, setSmallValue] = useState(1)
  const [largeValue, setLargeValue] = useState(1)

  const [thumbsLargeValue, setThumbsLargeValue] = useState<boolean>()
  const [thumbsSmallValue, setThumbsSmallValue] = useState<boolean>()

  const onChangeSmall = (event: ChangeEvent<HTMLInputElement>) => {
    setSmallValue(Number(event.target.value))
  }
  const onChangeLarge = (event: ChangeEvent<HTMLInputElement>) => {
    setLargeValue(Number(event.target.value))
  }

  return (
    <Container>
      <Container bottom={SPACING_6}>
        <Typography variant='heading' size='medium'>
          Stars
        </Typography>

        <Container flex direction='row'>
          <Container padded={SPACING_4}>
            <Typography variant='heading' size='small'>
              Small (default)
            </Typography>
            <Container top={SPACING_4} bottom={SPACING_4}>
              <Rating.Stars
                size='small'
                onChange={onChangeSmall}
                name='small-rating'
                value={smallValue}
              />
            </Container>
          </Container>

          <Container padded={SPACING_4}>
            <Typography variant='heading' size='small'>
              Large
            </Typography>
            <Container top={SPACING_4} bottom={SPACING_4}>
              <Rating.Stars
                size='large'
                onChange={onChangeLarge}
                name='large-rating'
                value={largeValue}
              />
            </Container>
          </Container>
        </Container>
      </Container>

      <Container>
        <Typography variant='heading' size='medium'>
          Thumbs
        </Typography>
        <Container flex direction='row'>
          <Container padded={SPACING_4}>
            <Typography variant='heading' size='small'>
              Small (default)
            </Typography>
            <Container top={SPACING_4} bottom={SPACING_4}>
              <Rating.Thumbs
                size='small'
                onChange={setThumbsSmallValue}
                name='small-thumbs-rating'
                value={thumbsSmallValue}
              />
            </Container>
          </Container>

          <Container padded={SPACING_4}>
            <Typography variant='heading' size='small'>
              Large
            </Typography>
            <Container top={SPACING_4} bottom={SPACING_4}>
              <Rating.Thumbs
                size='large'
                onChange={setThumbsLargeValue}
                name='large-thumbs-rating'
                value={thumbsLargeValue}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Example
```

### Custom Icon

The icons are fully customizable. You can provide a custom icon to render or add a tooltip to the default one.

```tsx
import type { ChangeEvent, ReactNode } from 'react'
import React, { useState } from 'react'
import { Tooltip, Rating } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(1)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }

  const renderItem = (itemValue: number, defaultIcon: ReactNode) => {
    return (
      <Tooltip content={`The value is ${itemValue}`}>{defaultIcon}</Tooltip>
    )
  }

  return (
    <div style={{ height: 26 }}>
      <Rating.Stars
        onChange={onChange}
        name='render-item-rating'
        value={value}
        renderItem={renderItem}
      />
    </div>
  )
}

export default Example
```
