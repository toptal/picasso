import React from 'react'

import Typography from '../Typography'
import Spacer from '../../Spacer'

const TypographyAlignmentExample = () => (
  <div>
    <Typography align='left'>Left</Typography>
    <Spacer bottom={1} />
    <Typography align='center'>Center</Typography>
    <Spacer bottom={1} />
    <Typography align='right'>Right</Typography>
  </div>
)

export default TypographyAlignmentExample
