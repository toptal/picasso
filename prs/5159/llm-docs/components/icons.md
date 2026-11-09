# Icons

| Name | Type | Description |
|------|------|-------------|
| color | `enum` | Color of icon |
| className | `string` | Class applied to SVG element |
| style | `CSSProperties` | Style applied to SVG element |
| scale | `enum` | scale of the icon |

| Name | Type | Description |
|------|------|-------------|
| color | `enum` | Color of icon |
| className | `string` | Class applied to SVG element |
| style | `CSSProperties` | Style applied to SVG element |
| scale | `enum` | scale of the icon |

Didn't find a required Icon? Feel free to add it yourself - [how to add icon](https://github.com/toptal/picasso#adding-icons-and-pictograms)

### List of all icons

```tsx
import React from 'react'
import { Grid, Paper, Typography, Container, Input } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import * as icons from '@toptal/picasso-icons'

/** We don't want to render internal icons */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Logo, LogoEmblem, DropdownArrows16, ...listIcons } = icons

const nonResponsive = (name: string) => !name.includes('Responsive')

const Example = () => {
  const [filter, setFilter] = React.useState('')

  const handleFilter = (
    e: React.ChangeEvent<{
      name?: string
      value: string
    }>
  ) => setFilter(e.target.value)

  const iconList = Object.keys(listIcons)
    .filter(nonResponsive)
    .filter(iconName =>
      iconName.toLocaleLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <Grid spacing={16}>
        <Grid.Item sm={12}>
          <Container flex>
            <Input
              icon={<listIcons.Search16 />}
              width='full'
              placeholder='Filter icons...'
              onChange={handleFilter}
            />
          </Container>
        </Grid.Item>
        {iconList.map(iconName => {
          const Icon = listIcons[iconName as keyof typeof listIcons]

          return (
            <Grid.Item key={iconName}>
              <Paper>
                <Container
                  flex
                  alignItems='center'
                  justifyContent='center'
                  padded={SPACING_4}
                  style={{
                    paddingBottom: '0.5rem',
                    minWidth: '9rem',
                    height: '7rem',
                  }}
                >
                  <Grid alignItems='center' direction='column' spacing={8}>
                    <Grid.Item>
                      <Icon />
                    </Grid.Item>
                    <Grid.Item>
                      <Typography size='xsmall'>{iconName}</Typography>
                    </Grid.Item>
                  </Grid>
                </Container>
              </Paper>
            </Grid.Item>
          )
        })}
      </Grid>
    </div>
  )
}

export default Example
```

### Default

```tsx
import React from 'react'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Settings16 />
  </div>
)

export default Example
```

### Scale

Recommended way is to use `scale` property to adjust the icon scale, you should avoid scaling icons with either `font-size` or `width` and `height` because our icons are pixel perfect and designed for a specific size. When scaling of this icon occurs, it is breaking our visual guidelines

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16, Settings24 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Container inline right={SPACING_4}>
      <Settings16 scale={2} />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings24 scale={2} />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings16 scale={3} />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings24 scale={3} />
    </Container>
  </div>
)

export default Example
```

### Responsive icons

For every icon that is used as an interactive element, we suggest to use their responsive counterparts. Responsive icons are set to have 24px size on screens under lg and xl breakpoints (16px otherwise).

```tsx
import React from 'react'
import {
  AsteriskSolidResponsive,
  Container,
  DoneResponsive,
  ExclamationSolidResponsive,
} from '@toptal/picasso'

const Example = () => (
  <div>
    <Container inline right='small' padded='xsmall'>
      <ExclamationSolidResponsive />
    </Container>
    <Container inline right='small' padded='xsmall'>
      <DoneResponsive />
    </Container>
    <Container
      style={{ backgroundColor: 'black' }}
      inline
      right='small'
      padded='xsmall'
    >
      <AsteriskSolidResponsive color='white' />
    </Container>
  </div>
)

export default Example
```

### With text

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Settings16, Settings24 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <div>
      <Settings16 style={{ marginRight: '0.5rem' }} />
      Vertical alignment of the icon with the same height as text
    </div>

    <Container flex alignItems='center' top={SPACING_4}>
      <Settings24 style={{ marginRight: '0.5rem' }} />
      Vertical alignment of the icon with bigger height than text
    </Container>
  </div>
)

export default Example
```

### Color

```tsx
import React from 'react'
import { Container } from '@toptal/picasso'
import { SPACING_4, SPACING_2 } from '@toptal/picasso-utils'
import { Settings16 } from '@toptal/picasso-icons'

const Example = () => (
  <div>
    <Container inline right={SPACING_4}>
      <Settings16 color='red' />
    </Container>
    <Container inline right={SPACING_4}>
      <Settings16 color='green' />
    </Container>
    <Container
      inline
      right={SPACING_4}
      style={{ backgroundColor: 'black' }}
      padded={SPACING_2}
    >
      <Settings16 color='white' />
    </Container>
  </div>
)

export default Example
```
