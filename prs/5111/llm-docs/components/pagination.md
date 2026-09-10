# Pagination

Component which allows navigating long data lists.

## Props

### Pagination

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **activePage** | `number` | - | Value of the current highlighted page |
| disabled | `boolean` | `false` | Shows `Pagination` in disabled state when pages are not changeable |
| **onPageChange** | `(page: number) => void` | - | Callback invoked when any page number is clicked |
| siblingCount | `number` | `2` | Number of the active page siblings |
| nextDisabled | `boolean` | - | Shows the next button as disabled. |
| className | `string` | - | Classnames applied to root element |
| style | `CSSProperties` | - | Style applied to root element |
| variant | `"default" \| "compact"` | `default` | Variant of the pagination representation |
| totalPages | `number` | - | Value of total pages of the data set used for calculation of page buttons. Value of total pages of the data set used for calculation of page buttons. Only optional for the `compact` variant. When not provided the last page can't be detected, so next button will always be enabled. Use `nextDisabled=true` to disable it when rendering the last page. |

### Default

```tsx
import React from 'react'
import { Pagination } from '@toptal/picasso'

const Example = () => (
  <div>
    <Pagination
      activePage={4}
      onPageChange={handlePageChange}
      totalPages={10}
    />
  </div>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
```

### Disabled

```tsx
import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Disabled
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={4}
        disabled
        onPageChange={handlePageChange}
        totalPages={10}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Next disabled
      </Typography>
    </Container>
    <Container>
      <Pagination
        activePage={4}
        nextDisabled
        onPageChange={handlePageChange}
        totalPages={10}
      />
    </Container>
  </Container>
)

const handlePageChange = () => {}

export default Example
```

### Variants

```tsx
import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Default
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Compact
      </Typography>
    </Container>
    <Container>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        variant='compact'
      />
    </Container>
  </Container>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
```

### Ellipsis

```tsx
import React from 'react'
import { Pagination, Container, Typography } from '@toptal/picasso'
import { SPACING_2, SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex direction='column' justifyContent='space-between'>
    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        0 or 1 pages
      </Typography>
      <Typography size='xsmall'>~ NULL ~</Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={1}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        No ellipsises
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={3}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        End ellipsis
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={1}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Start ellipsis
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={5}
        onPageChange={handlePageChange}
        totalPages={5}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Two ellipsises
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={1234}
        onPageChange={handlePageChange}
        totalPages={10000}
      />
    </Container>

    <Container bottom={SPACING_2}>
      <Typography variant='heading' size='small'>
        Custom siblings count
      </Typography>
    </Container>
    <Container bottom={SPACING_4}>
      <Pagination
        activePage={1234}
        onPageChange={handlePageChange}
        totalPages={10000}
        siblingCount={4}
      />
    </Container>
  </Container>
)

const handlePageChange = (page: number) => {
  window.alert('Page changed to ' + page)
}

export default Example
```
