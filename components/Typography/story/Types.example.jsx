import React from 'react'
import { Typography, Spacer } from '@toptal/picasso'

const TypographyTypesExample = () => (
  <div>
    <Typography variant='large'>Large paragraph</Typography>
    <Spacer bottom={1} />
    <Typography>Paragraph</Typography>
    <Spacer bottom={1} />
    <Typography variant='small'>Small paragraph</Typography>
    <Spacer bottom={1} />
    <Typography variant='caption'>Caption</Typography>
  </div>
)

export default TypographyTypesExample
