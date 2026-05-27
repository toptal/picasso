# List

## Props

### List

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| variant | `ordered \| unordered` | `unordered` | The variant to use |
| start | `number` | `1` | Specifies the start value of the first list item in an ordered list |
| styleType | `"circle" \| "disc" \| "checkmark" \| "arrow" \| "numeral" \| "alpha" \| "roman"` | - | Style for items bullet/ordinal, can be overridden on a item level |

### List.Item

| Name | Type | Default | Description |
|------|------|---------|-------------|
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| type | `"circle" \| "disc" \| "checkmark" \| "arrow" \| "numeral" \| "alpha" \| "roman"` | - | Style of the bullet/ordinal |

### Ordered

```tsx
import React from 'react'
import { List, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const DefaultExample = () => (
  <Container bottom={SPACING_6}>
    <List variant='ordered'>
      <List.Item>Add at least 10 skills</List.Item>
      <List.Item>Set your age</List.Item>
    </List>
  </Container>
)

export default DefaultExample
```

### Ordered with custom start

```tsx
import React from 'react'
import { List, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const DefaultExample = () => (
  <Container bottom={SPACING_6}>
    <List variant='ordered' start={5}>
      <List.Item>Add at least 10 skills</List.Item>
      <List.Item>Set your age</List.Item>
    </List>
  </Container>
)

export default DefaultExample
```

### Unordered

```tsx
import React from 'react'
import { List, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const DefaultExample = () => (
  <Container bottom={SPACING_6}>
    <List variant='unordered'>
      <List.Item>Add at least 10 skills</List.Item>
      <List.Item>Set your age</List.Item>
    </List>
  </Container>
)

export default DefaultExample
```

### Nested

```tsx
import React from 'react'
import { List, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const NestedExample = () => (
  <Container bottom={SPACING_6}>
    <Container>
      <h3>Ordered</h3>
      <Container>
        <List variant='ordered'>
          <List.Item>
            Consectetur enim ratione exercitationem dolorem totam. Vitae iste
            perspiciatis excepturi
          </List.Item>
          <List.Item>Adipisicing blanditiis cumque possimus ea?</List.Item>
          <List.Item>
            Sit consectetur amet doloribus odio
            <List variant='ordered'>
              <List.Item>
                Ipsum facere sunt vel odio quo, neque Doloremque alias
                perspiciatis.
              </List.Item>
              <List.Item>
                Dolor delectus officiis vero repudiandae reiciendis, dolores
                Sequi nostrum a!
              </List.Item>
              <List.Item>
                Lorem adipisicing voluptatum odio voluptatem quia, cum. Totam
                explicabo doloremque
                <List variant='ordered'>
                  <List.Item>Ipsum excepturi vero tenetur sapiente</List.Item>
                  <List.Item>
                    Consectetur doloribus aspernatur eius ipsam.
                  </List.Item>
                  <List.Item>Consectetur consectetur odio nisi fugit</List.Item>
                </List>
              </List.Item>
            </List>
          </List.Item>
        </List>
      </Container>
    </Container>

    <Container>
      <h3>Unordered</h3>
      <Container>
        <List variant='unordered'>
          <List.Item>
            Consectetur enim ratione exercitationem dolorem totam. Vitae iste
            perspiciatis excepturi
          </List.Item>
          <List.Item>Adipisicing blanditiis cumque possimus ea?</List.Item>
          <List.Item>
            Sit consectetur amet doloribus odio
            <List variant='unordered'>
              <List.Item>
                Ipsum facere sunt vel odio quo, neque Doloremque alias
                perspiciatis.
              </List.Item>
              <List.Item>
                Dolor delectus officiis vero repudiandae reiciendis, dolores
                Sequi nostrum a!
              </List.Item>
              <List.Item>
                Lorem adipisicing voluptatum odio voluptatem quia, cum. Totam
                explicabo doloremque
                <List variant='unordered'>
                  <List.Item>Ipsum excepturi vero tenetur sapiente</List.Item>
                  <List.Item>
                    Consectetur doloribus aspernatur eius ipsam.
                  </List.Item>
                  <List.Item>Consectetur consectetur odio nisi fugit</List.Item>
                </List>
              </List.Item>
            </List>
          </List.Item>
        </List>
      </Container>
    </Container>
  </Container>
)

export default NestedExample
```

### Styles

```tsx
import React from 'react'
import { Container, List, Typography } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'
import type { ListItemType } from '@toptal/picasso/List'

const ListStyleExample = ({ type }: { type: ListItemType }) => (
  <Container bottom={SPACING_8}>
    <Typography variant='heading' size='medium'>
      Style Type: {type}
    </Typography>

    <List styleType={type}>
      <List.Item>Elit sunt quaerat ratione nobis</List.Item>
      <List.Item>
        Lorem totam porro deserunt laborum illo natus Voluptas vitae odit quis
        at cupiditate. Id velit unde labore provident ratione. Voluptate.
        <List styleType={type}>
          <List.Item>Sit ipsum fuga aliquam harum veniam. Culpa</List.Item>
          <List.Item>Amet eos illo excepturi natus</List.Item>
        </List>
      </List.Item>
    </List>
  </Container>
)

const StylesExample = () => {
  return (
    <Container>
      <ListStyleExample type='circle' />
      <ListStyleExample type='disc' />
      <ListStyleExample type='checkmark' />
      <ListStyleExample type='arrow' />
      <ListStyleExample type='numeral' />
      <ListStyleExample type='alpha' />
      <ListStyleExample type='roman' />
    </Container>
  )
}

export default StylesExample
```
