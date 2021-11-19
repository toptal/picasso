import React from 'react'

import { DynamicPointNode } from '../types'

export const NodeContent = ({ node }: { node: DynamicPointNode }) => (
  <g>
    <text x={0} y={0} dy='.35em'>
      {node.data.info.name}
    </text>
  </g>
)
