import React, { FC } from 'react'

import { DynamicPointNode } from '../types'

export const NodeContent: FC<{
  node: DynamicPointNode
}> = ({ node }) => (
  <g>
    <text x={0} y={0} dy='.35em'>
      {node.data.info.name}
    </text>
  </g>
)
