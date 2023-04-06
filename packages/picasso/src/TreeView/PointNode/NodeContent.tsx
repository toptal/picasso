import React from 'react'

import type { DynamicPointNode } from '../types'

export const NodeContent = ({ node }: { node: DynamicPointNode }) => {
  return (
    <g>
      <text x={0} y={0} dy='.35em'>
        {node.data.info.name}
      </text>
    </g>
  )
}
