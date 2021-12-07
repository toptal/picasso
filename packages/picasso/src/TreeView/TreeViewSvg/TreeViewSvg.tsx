import { HierarchyPointNode } from 'd3-hierarchy'
import React from 'react'

import PointLink from '../PointLink'
import PointNode from '../PointNode'
import {
  DirectionsType,
  DynamicPointLink,
  DynamicPointNode,
  TreeNodeInterface
} from '../types'

interface TreeViewSvgProps {
  links: DynamicPointLink[]
  nodes: DynamicPointNode[]
  direction: DirectionsType
  verticalMargin: number
  horizontalMargin: number
  renderNode?: (
    pointNode: HierarchyPointNode<TreeNodeInterface>
  ) => React.ReactNode
  svgProps?: React.SVGAttributes<SVGSVGElement>
  graphProps?: React.SVGAttributes<SVGGElement>
}

const TreeViewSvg = React.forwardRef<SVGSVGElement, TreeViewSvgProps>(
  (
    {
      links,
      nodes,
      direction,
      verticalMargin,
      horizontalMargin,
      renderNode,
      svgProps,
      graphProps
    },
    ref
  ) => {
    return (
      <svg ref={ref} {...svgProps}>
        <g {...graphProps}>
          {links.map(link => (
            <PointLink
              link={link}
              key={`link-${link.target.data.id}-${link.source.data.id}`}
              direction={direction}
              verticalMargin={verticalMargin}
              horizontalMargin={horizontalMargin}
            />
          ))}
          {nodes.map(node => (
            <PointNode
              ref={node.ref}
              node={node}
              key={`node-${node.data.id}`}
              renderNode={renderNode}
            />
          ))}
        </g>
      </svg>
    )
  }
)

export default TreeViewSvg
