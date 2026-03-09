# Typography

Our primary typeface is Proxima Nova, a contemporary font that combines humanist proportions with a geometric appearance—making it the perfect typeface.

## Props

### Typography

| Name | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"heading" \| "body"` | `body` | Font variant for inner text |
| children | `ReactNode` | - | Text content |
| inline | `boolean` | `false` | Controls whether the Typography is inline or not |
| align | `"inherit" \| "left" \| "center" \| "right" \| "justify"` | - | Text align of the inner text |
| size | `"xxsmall" \| "xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "inherit"` | `inherit` | Size of the inner text |
| weight | `"inherit" \| "regular" \| "semibold"` | - | Font weight of the inner text |
| invert | `boolean` | - | Invert color |
| color | `"inherit" \| "green" \| "red" \| "yellow" \| "light-grey" \| "grey" \| "grey-main-2" \| "dark-grey" \| "black" \| "light-blue"` | - | Text color |
| noWrap | `boolean` | `false` | Enable ellipsis for overflowing text |
| as | `ElementType<HTMLAttributes<HTMLElement>>` | - | Rendered HTML markup |
| underline | `"solid" \| "dashed"` | - | Controls when the Typography should have an underline |
| lineThrough | `boolean` | - | Controls when the Typography should have line through |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| titleCase | `boolean` | - | Defines if the text should be transformed to title case |

### Normal text

```tsx
import React from 'react'
import { Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Typography>Just text</Typography>
  </div>
)

export default Example
```

### Headings

```tsx
import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='small'>
        Heading Small
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='medium'>
        Heading Medium
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography variant='heading' size='large'>
        Heading Large
      </Typography>
    </Container>
    <Typography variant='heading' size='xlarge'>
      Heading Extra Large
    </Typography>
  </div>
)

export default Example
```

### Types

Long-form text uses a 1.5 ratio to calculate line-height values.

```tsx
import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography size='large'>Body Large</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='black' size='medium'>
        Body Medium Black
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='medium'>Body Medium Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='small'>Body Small Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='xsmall'>Body Xsmall Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography size='xxsmall'>Body Xxsmall Grey</Typography>
    </Container>
  </div>
)

export default Example
```

### Inherit size

In some cases, you may want to use the font size inherited
      from the container where the Topography is nested.

```tsx
import React from 'react'
import { Typography } from '@toptal/picasso'

const Example = () => (
  <div style={{ fontSize: '2rem' }}>
    <Typography>Inherit font size</Typography>
  </div>
)

export default Example
```

### Alignment

```tsx
import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography align='left'>Left</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography align='center'>Center</Typography>
    </Container>
    <Typography align='right'>Right</Typography>
  </div>
)

export default Example
```

### Weights

```tsx
import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography weight='regular'>Regular</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography weight='semibold'>Semibold</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography weight='semibold' as='div'>
        <Typography weight='inherit'>Inherit Semibold</Typography>
      </Typography>
    </Container>
  </div>
)

export default Example
```

### Colors

```tsx
import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4, SPACING_2, palette } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography color='green'>Green</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='red'>Red</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='yellow'>Yellow</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='light-grey'>Light Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='grey'>Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='grey-main-2'>Grey Main 2</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='dark-grey'>Dark Grey</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography color='black'>Black</Typography>
    </Container>
    <Container
      padded={SPACING_2}
      style={{ backgroundColor: palette.blue.dark }}
    >
      <Typography invert>White for inverted backgrounds</Typography>
    </Container>
    <Container padded={SPACING_2} style={{ color: palette.grey.main }}>
      <Typography color='inherit'>Inherit color</Typography>
    </Container>
  </div>
)

export default Example
```

### Augment as another HTML element

In some cases you may want to change the default
      HTML tag used for Typography. In this cases you can 
      use 'as' property.

```tsx
import React from 'react'
import { Typography } from '@toptal/picasso'

const Example = () => <Typography as='h5'>Just text</Typography>

export default Example
```

### Decoration

```tsx
import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container bottom={SPACING_4}>
      <Typography underline='solid'>solid</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography underline='dashed'>dashed</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Typography>
        This is how you can highlight text by making it{' '}
        <Typography as='span' inline weight='semibold'>
          bold
        </Typography>
        , or by{' '}
        <Typography as='span' inline color='green'>
          changing
        </Typography>{' '}
        its{' '}
        <Typography as='span' inline color='red'>
          color
        </Typography>
        .
      </Typography>
    </Container>
  </div>
)

export default Example
```

### Line through

```tsx
import React from 'react'
import { Typography } from '@toptal/picasso'

const Example = () => (
  <div>
    <Typography lineThrough>Struck text</Typography>
  </div>
)

export default Example
```
