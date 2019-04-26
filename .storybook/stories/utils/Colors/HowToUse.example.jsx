import React from 'react'
import { palette, Typography } from '@toptal/picasso'

const HowToUseExample = () => (
  <Typography>
    Use the color just directly from Picasso. For example,
    <span style={{ color: palette.primary.main }}>
      {` I'm painted primary main color`}
    </span>
  </Typography>
)

export default HowToUseExample
