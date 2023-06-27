import React from 'react'
import { Typography, OverviewBlock, Tooltip } from '@toptal/picasso'

const customLabel = (
  <Tooltip content='You inside the tooltip!' placement='top'>
    <Typography size='xxsmall' weight='semibold'>
      Custom Label with Tooltip
    </Typography>
  </Tooltip>
)

const CustomLabel = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock value='4249' label={customLabel} />
      <OverviewBlock value='19302' label='Standard Label' />
    </OverviewBlock.Group>
  )
}

export default CustomLabel
