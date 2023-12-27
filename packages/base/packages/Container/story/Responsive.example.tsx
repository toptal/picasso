import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import {
  SPACING_10,
  SPACING_12,
  SPACING_4,
  SPACING_6,
  SPACING_8,
} from '@toptal/picasso/utils'

const Example = () => (
  <Container style={{ backgroundColor: 'lightgray' }}>
    <Typography>
      Try resizing the window to see how the spacing changes
    </Typography>

    <Container
      inline
      style={{ backgroundColor: 'royalblue' }}
      padded={{
        xs: SPACING_12,
        sm: SPACING_10,
        md: SPACING_8,
        lg: SPACING_6,
        xl: SPACING_4,
      }}
      left={{
        xs: SPACING_12,
        sm: SPACING_10,
        md: SPACING_8,
        lg: SPACING_6,
        xl: SPACING_4,
      }}
    >
      Lorem reiciendis quis lorem doloribus quos doloremque! Temporibus
      dignissimos deleniti accusamus aliquam voluptatibus? Quibusdam laboriosam
      neque saepe odit quidem! Incidunt hic corporis repudiandae laudantium
      reiciendis ex, doloribus Delectus dolorem adipisci.
    </Container>
  </Container>
)

export default Example
