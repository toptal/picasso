# Badge

Renders a small badge.

## Props

### Badge

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **content** | `number` | - | The `Badge` content |
| variant | `"white" \| "red"` | `white` | Variant of the `Badge` |
| size | `"medium" \| "small" \| "large"` | `large` | Size of the `Badge` |
| max | `number` | - | Max count to show. By default 9 for small size, 99 for other sizes |
| children | `ReactNode` | - | The badged will be overlaid on it's children |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Variants

```tsx
import React from 'react'
import { Container, Typography, Badge } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>
    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Badge content={1} variant='white' />
      <Badge content={0} variant='white' />
    </Container>

    <Container top={SPACING_6}>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>
    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Badge content={100} variant='red' />
      <Badge content={1} variant='red' />
    </Container>
  </>
)

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Container, Typography, Badge, Grid } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        Small:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} bottom={SPACING_6} flex gap={SPACING_4}>
          <Badge content={1} variant='white' size='small' />
          <Badge content={7} variant='white' size='small' />
          <Badge content={25} variant='white' size='small' />
        </Container>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} bottom={SPACING_6} flex gap={SPACING_4}>
          <Badge content={1} variant='red' size='small' />
          <Badge content={7} variant='red' size='small' />
          <Badge content={25} variant='red' size='small' />
        </Container>
      </Grid.Item>
    </Grid>

    <Container>
      <Typography variant='heading' size='small'>
        Medium:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} bottom={SPACING_6} flex gap={SPACING_4}>
          <Badge content={1} variant='white' size='medium' />
          <Badge content={7} variant='white' size='medium' />
          <Badge content={25} variant='white' size='medium' />
          <Badge content={99} variant='white' size='medium' />
          <Badge content={200} variant='white' size='medium' />
        </Container>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} bottom={SPACING_6} flex gap={SPACING_4}>
          <Badge content={1} variant='red' size='medium' />
          <Badge content={7} variant='red' size='medium' />
          <Badge content={25} variant='red' size='medium' />
          <Badge content={99} variant='red' size='medium' />
          <Badge content={200} variant='red' size='medium' />
        </Container>
      </Grid.Item>
    </Grid>

    <Container>
      <Typography variant='heading' size='small'>
        Large:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} bottom={SPACING_6} flex gap={SPACING_4}>
          <Badge content={1} variant='white' size='large' />
          <Badge content={7} variant='white' size='large' />
          <Badge content={25} variant='white' size='large' />
          <Badge content={99} variant='white' size='large' />
          <Badge content={200} variant='white' size='large' />
        </Container>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} bottom={SPACING_6} flex gap={SPACING_4}>
          <Badge content={1} variant='red' size='large' />
          <Badge content={7} variant='red' size='large' />
          <Badge content={25} variant='red' size='large' />
          <Badge content={99} variant='red' size='large' />
          <Badge content={200} variant='red' size='large' />
        </Container>
      </Grid.Item>
    </Grid>
    <Container>
      <Typography variant='heading' size='small'>
        Custom max count:
      </Typography>
    </Container>
    <Grid>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} flex alignItems='center' gap={SPACING_4}>
          <Badge content={9999} variant='white' size='small' max={999} />
          <Badge content={9999} variant='white' size='medium' max={999} />
          <Badge content={9999} variant='white' size='large' max={999} />
        </Container>
      </Grid.Item>
      <Grid.Item sm={6}>
        <Container top={SPACING_4} flex alignItems='center' gap={SPACING_4}>
          <Badge content={9999} variant='red' size='small' max={999} />
          <Badge content={9999} variant='red' size='medium' max={999} />
          <Badge content={9999} variant='red' size='large' max={999} />
        </Container>
      </Grid.Item>
    </Grid>
  </>
)

export default Example
```

### Overlay

```tsx
import React from 'react'
import { Avatar, Container, Typography, Badge } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>

    <Container top={SPACING_4} flex bottom={SPACING_6} gap={SPACING_4}>
      <Badge content={1} variant='white' size='small'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
      <Badge content={1} variant='white' size='medium'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
      <Badge content={1} variant='white' size='large'>
        <Avatar name='Jacqueline Roque' />
      </Badge>
    </Container>

    <Container>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>

    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Badge content={100} variant='red' size='small'>
        <Avatar name='Adam Jones' />
      </Badge>
      <Badge content={100} variant='red' size='medium'>
        <Avatar name='Adam Jones' />
      </Badge>
      <Badge content={100} variant='red' size='large'>
        <Avatar name='Adam Jones' />
      </Badge>
    </Container>
  </>
)

export default Example
```
