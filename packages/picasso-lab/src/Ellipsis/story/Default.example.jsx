import React from 'react'
import { Typography, Tooltip } from '@toptal/picasso'
import { Ellipsis } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <Ellipsis
        renderWhenEllipsis={child => (
          <Tooltip
            content='Long text will be shortened and suffixed with ellipsis'
            placement='top'
          >
            {child}
          </Tooltip>
        )}
      >
        <Typography noWrap data-testid='ellipsed-text'>
          Long text will be shortened and suffixed with ellipsis
        </Typography>
      </Ellipsis>

      <Ellipsis
        renderWhenEllipsis={child => (
          <Tooltip
            content='Short text displays completely'
            open
            placement='top'
          >
            {child}
          </Tooltip>
        )}
      >
        <Typography noWrap>Short text displays completely</Typography>
      </Ellipsis>
    </div>
  )
}

export default Example
