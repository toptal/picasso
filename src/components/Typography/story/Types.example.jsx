import React from 'react'
import { Typography } from '@toptal/picasso'

const TypographyTypesExample = () => (
  <div>
    <Typography variant='large' gutterBottom={1}>
      Large paragraph
    </Typography>
    <Typography gutterBottom={1}>Paragraph</Typography>
    <Typography variant='small' gutterBottom={1}>
      Small paragraph
    </Typography>
    <Typography variant='caption'>Caption</Typography>
  </div>
)

export default TypographyTypesExample
