# Pictograms

| Name | Type | Description |
|------|------|-------------|
| className | `string` | Class applied to SVG element |
| style | `CSSProperties` | Style applied to SVG element |
| scale | `enum` | scale of the pictogram |

| Name | Type | Description |
|------|------|-------------|
| className | `string` | Class applied to SVG element |
| style | `CSSProperties` | Style applied to SVG element |
| scale | `enum` | scale of the pictogram |

Didn't find a required Pictogram? Feel free to add it yourself - [how to add icon or pictogram](https://github.com/toptal/picasso#adding-icons-and-pictograms)

### List of all pictograms

```tsx
import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Container,
  Input,
  Search16,
} from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'
import * as pictograms from '@toptal/picasso-pictograms/Pictogram'

const Example = () => {
  const [filter, setFilter] = React.useState('')

  const handleFilter = (
    e: React.ChangeEvent<{
      name?: string
      value: string
    }>
  ) => setFilter(e.target.value)

  const pictogramsList = Object.keys(pictograms).filter(name =>
    name.toLocaleLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Grid spacing={16}>
        <Grid.Item sm={12}>
          <Container flex>
            <Input
              icon={<Search16 />}
              width='full'
              placeholder='Filter pictograms...'
              onChange={handleFilter}
            />
          </Container>
        </Grid.Item>
        {pictogramsList.map(pictogramName => {
          const Pictogram = pictograms[pictogramName as keyof typeof pictograms]

          return (
            <Grid.Item key={pictogramName}>
              <Paper>
                <Container
                  flex
                  alignItems='center'
                  justifyContent='center'
                  padded={SPACING_4}
                  style={{
                    paddingBottom: '0.5rem',
                    minWidth: '9rem',
                  }}
                >
                  <Grid alignItems='center' direction='column' spacing={8}>
                    <Grid.Item>
                      <Container padded={SPACING_6} variant='grey'>
                        <Pictogram />
                      </Container>
                    </Grid.Item>
                    <Grid.Item>
                      <Typography size='xsmall'>{pictogramName}</Typography>
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
import {
  WaterfallWhite64,
  WaterfallBlue64,
} from '@toptal/picasso-pictograms/Pictogram'
import { Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'

const Example = () => (
  <Container flex>
    <Container right={SPACING_6}>
      <Container padded={SPACING_6} variant='grey'>
        <WaterfallWhite64 />
      </Container>
    </Container>
    <Container>
      <Container padded={SPACING_6} variant='grey'>
        <WaterfallBlue64 />
      </Container>
    </Container>
  </Container>
)

export default Example
```

### Scale

Recommended way is to use `scale` property to adjust the pictogram scale, you should avoid scaling pictograms with either `font-size` or `width` and `height` because our pictograms are pixel perfect and designed for a specific size. When scaling of this pictogram occurs, it is breaking our visual guidelines

```tsx
import { Container } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso-utils'
import React from 'react'
import { WaterfallBlue64 } from '@toptal/picasso-pictograms/Pictogram'

const Example = () => (
  <Container flex>
    <Container padded={SPACING_6} right={SPACING_6}>
      <WaterfallBlue64 scale={1} />
    </Container>
    <Container padded={SPACING_6}>
      <WaterfallBlue64 scale={2} />
    </Container>
  </Container>
)

export default Example
```
