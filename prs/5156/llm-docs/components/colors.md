# Colors

The Toptal color palette comprises the core brand colors
      plus a range of shades and tints.

### How to use

```tsx
import React from 'react'
import { palette } from '@toptal/picasso-utils'
import { Typography } from '@toptal/picasso'

const Example = () => (
  <Typography>
    Use the color just directly from Picasso. For example,{' '}
    <span style={{ color: palette.blue.main }}>
      I am painted by the blue main color
    </span>
  </Typography>
)

export default Example
```

### Colors

```tsx
import React, { Fragment } from 'react'
import { palette, SPACING_8, SPACING_4 } from '@toptal/picasso-utils'
import { Grid, Paper, Typography, Container } from '@toptal/picasso'

const colorGroups = Object.entries(palette)

const Example = () => (
  <>
    {colorGroups.map(([colorGroupName, colorGroup]) => (
      <Fragment key={colorGroupName}>
        <Container top={SPACING_8} bottom={SPACING_4}>
          <Typography variant='heading' size='large'>
            {colorGroupName}
          </Typography>
        </Container>
        <ColorGroup
          colors={Object.entries(colorGroup)}
          colorGroupName={colorGroupName}
        />
      </Fragment>
    ))}
  </>
)

const ColorGroup = ({
  colors,
  colorGroupName,
}: {
  colors: [string, string][]
  colorGroupName: string
}) => (
  <Grid spacing={16}>
    {colors.map(([colorName, color]) => (
      <Grid.Item key={colorName}>
        <Paper style={{ padding: '1rem' }}>
          <ColorRectangle color={color} />
          <Typography size='xsmall'>
            {`${colorGroupName}.${colorName}`}
          </Typography>
          <Typography variant='heading' size='small'>
            {color.toUpperCase()}
          </Typography>
        </Paper>
      </Grid.Item>
    ))}
  </Grid>
)

const ColorRectangle = ({ color }: { color: string }) => (
  <div
    style={{
      width: '7rem',
      height: '7rem',
      backgroundColor: color,
    }}
  />
)

export default Example
```
