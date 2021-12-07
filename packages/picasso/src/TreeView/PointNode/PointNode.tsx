import React, {
  forwardRef,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { DynamicPointNode } from '../types'
import { NodeContent } from './NodeContent'

export interface Props {
  node: DynamicPointNode
  renderNode?: (pointNode: DynamicPointNode) => ReactNode
}

export const PointNode = forwardRef<SVGGElement, Props>(
  ({ node, renderNode }, ref) => {
    const nodeRef = useRef<SVGForeignObjectElement | null>(null)
    const [dimensions, setDimensions] = useState<{
      width?: number
      height?: number
    }>({})
    const transform = useMemo(() => {
      return `translate(${node.x},${node.y})`
    }, [node.x, node.y])

    useLayoutEffect(() => {
      if (nodeRef.current) {
        const { offsetWidth: width, offsetHeight: height } = node.ref?.current
          ?.firstElementChild?.firstElementChild as HTMLElement

        if (dimensions.height !== height || dimensions.width !== width) {
          setDimensions({
            width,
            height
          })
        }
      }
    }, [dimensions, node.ref])

    return (
      <g id={node.id} transform={transform} ref={ref}>
        <foreignObject
          width={dimensions.width}
          height={dimensions.height}
          ref={nodeRef}
        >
          {renderNode ? renderNode(node) : <NodeContent node={node} />}
        </foreignObject>
      </g>
    )
  }
)

PointNode.displayName = 'Node'

export default PointNode
