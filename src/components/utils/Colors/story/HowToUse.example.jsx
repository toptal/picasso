import React from 'react'
import { palette } from '@toptal/picasso/utils'
import { Typography } from '@toptal/picasso'

const HowToUseExample = () => (
  <Typography>
    Use the color just directly from Picasso. For example,
    <span style={{ color: palette.blue.main }}>
      {` I'm painted by the blue main color`}
    </span>
  </Typography>
)

export default HowToUseExample
