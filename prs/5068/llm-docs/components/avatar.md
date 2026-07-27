# Avatar

Profile photo.

    Additional notes:
      * The shape of clipped corner has a fallback for <=IE11, Edge to just a rectangle

## Props

### Avatar

| Name | Type | Default | Description |
|------|------|---------|-------------|
| alt | `string` | - | Alt text |
| name | `string` | - | User full name to display initials on the avatar |
| size | `"xxsmall" \| "xsmall" \| "small" \| "medium" \| "large"` | `xsmall` | Size |
| src | `string` | - | Photo url |
| showEmblem | `boolean` | - | Displays Toptal logo |
| onEdit | `((event: MouseEvent<Element, MouseEvent>) => void)` | - | Callback to show edit-on-click and receive event |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |

### Default

```tsx
import React from 'react'
import { Avatar } from '@toptal/picasso'

const Example = () => (
  <Avatar
    alt='Jacqueline Roque. Pablo Picasso, 1954'
    src='./jacqueline-with-flowers-1954-square.jpg'
    name='Jacqueline Roque'
  />
)

export default Example
```

### Variants

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_4} flex gap={SPACING_4}>
    <Avatar
      size='medium'
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      name='Jacqueline Roque'
      src='./jacqueline-with-flowers-1954-square.jpg'
    />
    <Avatar size='medium' name='Jacqueline Roque' />
    <Avatar size='medium' />
    <Avatar
      size='medium'
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      name='Jacqueline Roque'
      src='./jacqueline-with-flowers-1954-square.jpg'
      showEmblem
    />
  </Container>
)

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Avatar
        size='xxsmall'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='xsmall'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='small'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Small'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='medium'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Medium'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Avatar
        size='large'
        alt='Jacqueline Roque. Pablo Picasso, 1954. Large'
        name='Jacqueline Roque'
        src='./jacqueline-with-flowers-1954-square.jpg'
      />
    </Container>

    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Avatar size='xxsmall' name='Jacqueline Roque' />
      <Avatar size='xsmall' name='Jacqueline Roque' />
      <Avatar size='small' name='Jacqueline Roque' />
      <Avatar size='medium' name='Jacqueline Roque' />
      <Avatar size='large' name='Jacqueline Roque' />
    </Container>

    <Container top={SPACING_4} flex gap={SPACING_4}>
      <Avatar size='xxsmall' />
      <Avatar size='xsmall' />
      <Avatar size='small' />
      <Avatar size='medium' />
      <Avatar size='large' />
    </Container>
  </div>
)

export default Example
```

### Long Name

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_4} flex gap={SPACING_4}>
    <Avatar size='xxsmall' name='William Wallace Wo Wade' />
    <Avatar size='xsmall' name='William Wallace Wo Wade' />
    <Avatar size='small' name='William Wallace Wo Wade' />
    <Avatar size='medium' name='William Wallace Wo Wade' />
    <Avatar size='large' name='William Wallace Wo Wade' />
  </Container>
)

export default Example
```

### Editable state

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const handleEdit = () => {
    window.alert('onEdit called')
  }

  return (
    <Container gap={SPACING_6} flex>
      <Avatar name='Jacqueline Roque' onEdit={handleEdit} />
      <Avatar
        alt='Jacqueline Roque. Pablo Picasso, 1954'
        src='./jacqueline-with-flowers-1954-square.jpg'
        name='Jacqueline Roque'
        size='medium'
        onEdit={handleEdit}
      />
    </Container>
  )
}

export default Example
```

### Variant with Toptal logo

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container top={SPACING_4} flex gap={SPACING_4}>
    <Avatar size='xxsmall' showEmblem />
    <Avatar size='xsmall' showEmblem />
    <Avatar size='small' showEmblem />
    <Avatar size='medium' name='Jacqueline Roque' showEmblem />
    <Avatar
      size='large'
      alt='Jacqueline Roque. Pablo Picasso, 1954'
      name='Jacqueline Roque'
      src='./jacqueline-with-flowers-1954-square.jpg'
      showEmblem
    />
  </Container>
)

export default Example
```

## Avatar Group

### Default

```tsx
import React from 'react'
import { Avatar } from '@toptal/picasso'

const person = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  src: './jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque',
}

const photolessPerson = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  name: 'Jacqueline Roque',
}

const namelessPerson = {}

const people = [
  person,
  photolessPerson,
  namelessPerson,
  person,
  person,
  person,
  person,
  person,
  person,
]

const Example = () => <Avatar.Group items={people} />

export default Example
```

### Limit

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const person = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  src: './jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque',
}

const generatePeople = (
  count: number
): { alt: string; src: string; name: string }[] => Array(count).fill(person)

const people6 = generatePeople(6)
const people3 = generatePeople(3)

const Example = () => (
  <Container flex direction='column' gap={SPACING_8}>
    <div>
      Over the Limit
      <Avatar.Group items={people6} />
    </div>
    <div>
      Less than Limit
      <Avatar.Group items={people3} />
    </div>
  </Container>
)

export default Example
```

### Sizes

```tsx
import React from 'react'
import { Avatar, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const person = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  src: './jacqueline-with-flowers-1954-square.jpg',
  name: 'Jacqueline Roque',
}

const photolessPerson = {
  alt: 'Jacqueline Roque. Pablo Picasso, 1954',
  name: 'Jacqueline Roque',
}

const namelessPerson = {}

const people = [
  person,
  photolessPerson,
  namelessPerson,
  person,
  person,
  person,
  person,
  person,
  person,
]

const Example = () => (
  <Container flex direction='column' gap={SPACING_8}>
    <div>
      xxsmall
      <Avatar.Group items={people} size='xxsmall' />
    </div>
    <div>
      xsmall
      <Avatar.Group items={people} size='xsmall' />
    </div>
    <div>
      small
      <Avatar.Group items={people} size='small' />
    </div>
    <div>
      medium
      <Avatar.Group items={people} size='medium' />
    </div>
    <div>
      large
      <Avatar.Group items={people} size='large' />
    </div>
  </Container>
)

export default Example
```
