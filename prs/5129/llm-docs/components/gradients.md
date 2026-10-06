# Gradients

Gradients are important visual elements. They are versatile and can be combined with other elements. To keep our visual language consistent it's important to make a correct use of our gradients. 
  
  These are the recommended gradients.
  
  Our gradients are made using our brand colors, always keeping a 200 points interval. For example: Blue 500 to Blue 700.

### How to use

```tsx
import React from 'react'
import { gradients, SPACING_4 } from '@toptal/picasso-utils'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom={SPACING_4}>
      <Typography>
        Use the gradient just directly from Picasso and apply it to any element
        as{' '}
        <Typography inline underline='solid'>
          background
        </Typography>{' '}
        style property.
      </Typography>
    </Container>
    <div
      style={{
        height: '5rem',
        background: gradients.blue,
      }}
    />
  </>
)

export default Example
```

### Gradients

```tsx
import React from 'react'
import { gradients, shadows } from '@toptal/picasso-utils'
import { Typography, Grid, Container } from '@toptal/picasso'

const Example = () => (
  <Grid>
    {Object.entries(gradients).map(([gradientKey, gradientValue]) => (
      <Grid.Item sm={6} key={gradientKey}>
        <Container>
          <Typography size='large'>{gradientKey}</Typography>
        </Container>
        <Container>
          <GradientRectangle gradient={gradientValue} />
        </Container>
      </Grid.Item>
    ))}
  </Grid>
)

const GradientRectangle = ({ gradient }: { gradient: string }) => (
  <div
    style={{
      height: '14rem',
      background: gradient,
      boxShadow: shadows[5],
    }}
  />
)

export default Example
```
